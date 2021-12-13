<template lang="pug">
  
  .editor__nav-items
    BButton(
      type="is-default"
      size="is-small"
      title="Paragraph"
      @click="$emit('setParagraph')"
    )
      AppEditorSprite(name="paragraph")

    BButton(
      type="is-default"
      size="is-small"
      title="Bold"
      @click="$emit('setBold')"
    )
      AppEditorSprite(name="bold")

    BButton(
      type="is-default"
      size="is-small"
      title="Italic"
      @click="$emit('setItalic')"
    )
      AppEditorSprite(name="italic")

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

</template>

<script lang="ts">

import Vue from 'vue'
import AppEditorSprite from './AppEditorSprite.vue'

export default Vue.extend({
  name: 'ContentsTools',

  components: {
    AppEditorSprite
  }
})

</script>
