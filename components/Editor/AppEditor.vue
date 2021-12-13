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
          @setBold="setBold"
          @setItalic="setItalic"
          @setUnderline="setUnderline"
          @setStrike="setStrike"
          @setBulletList="setBulletList"
          @setOrderedList="setOrderedList"
          @setBlockquote="setBlockquote"
          @setLink="setLink"
          @setImage="setImage"
          @setCode="setCode"
          @setCodeBlock="setCodeBlock"
          @setHorizontalRule="setHorizontalRule"
          @sendToPrint="sendToPrint"
        )

      EditorContent(
        :editor="editor"
        :disabled="isDisabled"
        v-model="textContent"
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
      editor: {} as Editor,

      textContent: this.content
    }
  },

  methods: {
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

    setBold() {
      this.editor.chain().focus().setBold().run()
    },

    setItalic() {
      this.editor.chain().focus().setItalic().run()
    },

    setUnderline() {
      this.editor.chain().focus().setUnderline().run()
    },

    setStrike() {
      this.editor.chain().focus().setStrike().run()
    },

    setBulletList() {
      this.editor.chain().focus().toggleBulletList().run()
    },

    setOrderedList() {
      this.editor.chain().focus().toggleOrderedList().run()
    },

    setBlockquote() {
      this.editor.chain().focus().setBlockquote().run()
    },

    setLink() {
      // this.editor.chain().focus().setLink().run()
    },

    setImage() {
      // this.editor.chain().focus().setImage().run()
    },

    setCode() {
      this.editor.chain().focus().setCode().run()
    },

    setCodeBlock() {
      this.editor.chain().focus().setCodeBlock().run()
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
