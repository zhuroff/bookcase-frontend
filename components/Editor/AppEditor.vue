<template lang="pug">

  .editor(
    :class="classname"
  )
    .editor__title(v-if="heading") {{ heading }}

    ClientOnly
      nav.editor__nav(v-if="!isDisabled")
        Component(
          :is="tools"
          :editor="editor"
          @setUndo="setUndo"
          @setRedo="setRedo"
          @setTitle="setTitle"
          @setParagraph="setParagraph"
          @toggleBold="toggleBold"
          @toggleItalic="toggleItalic"
          @toggleUnderline="toggleUnderline"
          @toggleStrike="toggleStrike"
          @setBulletList="setBulletList"
          @setOrderedList="setOrderedList"
          @toggleBlockquote="toggleBlockquote"
          @setLink="setLink"
          @setImage="setImage"
          @toggleCode="toggleCode"
          @toggleCodeBlock="toggleCodeBlock"
          @setHorizontalRule="setHorizontalRule"
          @sendToPrint="sendToPrint"
        )

      EditorContent(
        :editor="editor"
        :disabled="isDisabled"
        class="editor__content"
      )

</template>

<script lang="ts">

import Vue from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-2'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import History from '@tiptap/extension-history'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import HardBreak from '@tiptap/extension-hard-break'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import AnnotationTools from './AnnotationTools.vue'
import ContentsTools from './ContentsTools.vue'
import SummaryTools from './SummaryTools.vue'

type Level = 2 | 3 | 4

export default Vue.extend({
  name: 'AppEditor',
  
  components: {
    EditorContent,
    AnnotationTools,
    ContentsTools,
    SummaryTools
  },

  props: {
    heading: {
      type: String,
      required: false
    },

    fieldKey: {
      type: String,
      required: true
    },

    classname: {
      type: String,
      required: false
    },

    content: {
      type: String,
      required: false,
      default: ''
    },

    tools: {
      type: String,
      required: true
    },

    isDisabled: {
      type: Boolean,
      required: true
    }
  },

  mounted() {
    this.editor = new Editor({
      content: this.content,
      editable: !this.isDisabled,
      onUpdate: this.updateContent,
      extensions: [
        Document,
        Text,
        Heading,
        Paragraph,
        Bold,
        Italic,
        Strike,
        BulletList,
        OrderedList,
        ListItem,
        Blockquote,
        Code,
        CodeBlock,
        History,
        Link,
        Image,
        Underline,
        HardBreak,
        HorizontalRule
      ]
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },

  data() {
    return {
      editor: {} as Editor
    }
  },

  methods: {
    updateContent() {
      const payload = {
        key: this.fieldKey,
        value: this.editor.getHTML()
      }

      this.$emit('updateEditorContent', payload)
    },

    setUndo() {
      this.editor.chain().focus().undo().run()
    },

    setRedo() {
      this.editor.chain().focus().redo().run()
    },

    setTitle(level: Level) {
      this.editor.chain().focus().toggleHeading({ level: level }).run()
    },

    setParagraph() {
      this.editor.chain().focus().setParagraph().run()
    },

    toggleBold() {
      this.editor.chain().focus().toggleBold().run()
    },

    toggleItalic() {
      this.editor.chain().focus().toggleItalic().run()
    },

    toggleUnderline() {
      this.editor.chain().focus().toggleUnderline().run()
    },

    toggleStrike() {
      this.editor.chain().focus().toggleStrike().run()
    },

    setBulletList() {
      this.editor.chain().focus().toggleBulletList().run()
    },

    setOrderedList() {
      this.editor.chain().focus().toggleOrderedList().run()
    },

    toggleBlockquote() {
      this.editor.chain().focus().toggleBlockquote().run()
    },

    setLink() {
      // this.editor.chain().focus().setLink().run()
    },

    setImage() {
      // this.editor.chain().focus().setImage().run()
    },

    toggleCode() {
      this.editor.chain().focus().toggleCode().run()
    },

    toggleCodeBlock() {
      this.editor.chain().focus().toggleCodeBlock().run()
    },

    setHorizontalRule() {
      console.log(this.editor.chain().focus())
      this.editor.chain().focus().setHorizontalRule().run()
    },

    sendToPrint() {
      document.body.classList.add('print-summary')
      window.print()
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.editor {
  margin-bottom: 2rem;

  &__title {
    color: $lightGray;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  &__nav {
    position: sticky;
    top: 0;
    background-color: $deepDark;
    padding: 1rem 0;
    z-index: 1000;
  }

  &__content {
    color: $darkModeBody;
  }
}

</style>
