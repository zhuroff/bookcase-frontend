<template lang="pug">

  .editor
    .editor__title(v-if="heading") {{ heading }}

    ClientOnly
      nav.editor__nav(v-if="!isDisabled")
        Component(
          :is="tools"
          @setTitle="setTitle"
          @setParagraph="setParagraph"
          @setBold="setBold"
          @setItalic="setItalic"
          @setBulletList="setBulletList"
          @setOrderedList="setOrderedList"
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
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import History from '@tiptap/extension-history'
import AnnotationTools from './AnnotationTools.vue'

type Level = 2 | 3 | 4

export default Vue.extend({
  name: 'AppEditor',
  
  components: {
    EditorContent,
    AnnotationTools
  },

  props: {
    heading: {
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
        BulletList,
        OrderedList,
        ListItem,
        Blockquote,
        Code,
        CodeBlock,
        History
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

    setBulletList() {
      this.editor.chain().focus().toggleBulletList().run()
    },

    setOrderedList() {
      this.editor.chain().focus().toggleOrderedList().run()
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.editor {

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
