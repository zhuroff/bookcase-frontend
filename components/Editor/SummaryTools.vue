<template lang="pug">
  
  .editor__nav-items
    BButton(
      type="is-default"
      size="is-small"
      title="Undo"
      @click="$emit('setUndo')"
    )
      AppEditorSprite(name="undo")

    BButton(
      type="is-default"
      size="is-small"
      title="Redo"
      @click="$emit('setRedo')"
    )
      AppEditorSprite(name="redo")

    BButton(
      type="is-default"
      size="is-small"
      title="Heading 2"
      @click="$emit('setTitle', 2)"
    )
      AppEditorSprite(name="title-2")

    BButton(
      type="is-default"
      size="is-small"
      title="Heading 3"
      @click="$emit('setTitle', 3)"
    )
      AppEditorSprite(name="title-3")

    BButton(
      type="is-default"
      size="is-small"
      title="Heading 4"
      @click="$emit('setTitle', 4)"
    )
      AppEditorSprite(name="title-4")

    BButton(
      type="is-default"
      size="is-small"
      title="Paragraph"
      :class="{ '--active': editor.isActive('paragraph') }"
      @click="$emit('setParagraph')"
    )
      AppEditorSprite(name="paragraph")

    BButton(
      type="is-default"
      size="is-small"
      title="Bold"
      :class="{ '--active': editor.isActive('bold') }"
      @click="$emit('setBold')"
    )
      AppEditorSprite(name="bold")

    BButton(
      type="is-default"
      size="is-small"
      title="Italic"
      :class="{ '--active': editor.isActive('italic') }"
      @click="$emit('setItalic')"
    )
      AppEditorSprite(name="italic")

    BButton(
      type="is-default"
      size="is-small"
      title="Underline"
      @click="$emit('setUnderline')"
    )
      AppEditorSprite(name="underline")

    BButton(
      type="is-default"
      size="is-small"
      title="Strike through"
      @click="$emit('setStrike')"
    )
      AppEditorSprite(name="strike")

    BButton(
      type="is-default"
      size="is-small"
      title="Bullet list"
      @click="$emit('setBulletList')"
    )
      AppEditorSprite(name="bullet")

    BButton(
      type="is-default"
      size="is-small"
      title="Ordered list"
      @click="$emit('setOrderedList')"
    )
      AppEditorSprite(name="ordered")

    BButton(
      type="is-default"
      size="is-small"
      title="Blockquote"
      @click="$emit('setBlockquote')"
    )
      AppEditorSprite(name="blockquote")

    BButton(
      type="is-default"
      size="is-small"
      title="Link"
      @click="$emit('setLink')"
    )
      AppEditorSprite(name="link")

    BButton(
      type="is-default"
      size="is-small"
      title="Image"
      @click="$emit('setImage')"
    )
      AppEditorSprite(name="image")

    BButton(
      type="is-default"
      size="is-small"
      title="Code"
      @click="$emit('setCode')"
    )
      AppEditorSprite(name="code")

    BButton(
      type="is-default"
      size="is-small"
      title="Code block"
      @click="$emit('setCodeBlock')"
    )
      AppEditorSprite(name="code-block")

    BButton(
      type="is-default"
      size="is-small"
      title="Horizontal Rule"
      @click="$emit('setHorizontalRule')"
    )
      AppEditorSprite(name="hr")

    BButton(
      type="is-default"
      size="is-small"
      title="Print"
      @click="$emit('sendToPrint')"
    )
      AppEditorSprite(name="print")

</template>

<script lang="ts">

import Vue from 'vue'
import AppEditorSprite from './AppEditorSprite.vue'

export default Vue.extend({
  name: 'ContentsTools',

  props: {
    editor: {
      required: true
    }
  },

  components: {
    AppEditorSprite
  }
})

</script>
