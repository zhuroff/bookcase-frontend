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
      :class="{ '--active': editor.isActive('heading', { level: 2 } )}"
      @click="$emit('setTitle', 2)"
    )
      AppEditorSprite(name="title-2")

    BButton(
      type="is-default"
      size="is-small"
      title="Heading 3"
      :class="{ '--active': editor.isActive('heading', { level: 3 } )}"
      @click="$emit('setTitle', 3)"
    )
      AppEditorSprite(name="title-3")

    BButton(
      type="is-default"
      size="is-small"
      title="Heading 4"
      :class="{ '--active': editor.isActive('heading', { level: 4 } )}"
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
      @click="$emit('toggleBold')"
    )
      AppEditorSprite(name="bold")

    BButton(
      type="is-default"
      size="is-small"
      title="Italic"
      :class="{ '--active': editor.isActive('italic') }"
      @click="$emit('toggleItalic')"
    )
      AppEditorSprite(name="italic")

    BButton(
      type="is-default"
      size="is-small"
      title="Underline"
      :class="{ '--active': editor.isActive('underline') }"
      @click="$emit('toggleUnderline')"
    )
      AppEditorSprite(name="underline")

    BButton(
      type="is-default"
      size="is-small"
      title="Strike through"
      :class="{ '--active': editor.isActive('strike') }"
      @click="$emit('toggleStrike')"
    )
      AppEditorSprite(name="strike")

    BButton(
      type="is-default"
      size="is-small"
      title="Bullet list"
      :class="{ '--active': editor.isActive('bulletList') }"
      @click="$emit('setBulletList')"
    )
      AppEditorSprite(name="bullet")

    BButton(
      type="is-default"
      size="is-small"
      title="Ordered list"
      :class="{ '--active': editor.isActive('orderedList') }"
      @click="$emit('setOrderedList')"
    )
      AppEditorSprite(name="ordered")

    BButton(
      type="is-default"
      size="is-small"
      title="Blockquote"
      :class="{ '--active': editor.isActive('blockquote') }"
      @click="$emit('toggleBlockquote')"
    )
      AppEditorSprite(name="blockquote")

    BDropdown
      template(#trigger="{ active }")
        BButton(
          type="is-default"
          size="is-small"
          title="Link"
          :class="{ '--active': editor.isActive('link') }"
        )
          AppEditorSprite(name="link")
      template
        BInput(
          type="text"
          size="is-small"
          v-model="linkURL"
          placeholder="Link URL"
        )

        BButton(
          type="is-success"
          size="is-small"
          @click="setLink"
        )
          AppSprite(name="check")

    BDropdown
      template(#trigger="{ active }")
        BButton(
          type="is-default"
          size="is-small"
          title="Image"
          :class="{ '--active': editor.isActive('image') }"
        )
          AppEditorSprite(name="image")
      template
        BUpload(
          v-model="image"
          @input="uploadImage"
        )
          section.section
            .content.has-text-centered
              p
                BIcon(
                  icon="upload"
                  size="is-large"
                )
              p Drop file here or click to upload

    BButton(
      type="is-default"
      size="is-small"
      title="Code"
      :class="{ '--active': editor.isActive('code') }"
      @click="$emit('toggleCode')"
    )
      AppEditorSprite(name="code")

    BButton(
      type="is-default"
      size="is-small"
      title="Code block"
      :class="{ '--active': editor.isActive('codeBlock') }"
      @click="$emit('toggleCodeBlock')"
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
import AppSprite from '~/components/AppSprite.vue'

export default Vue.extend({
  name: 'ContentsTools',

  props: {
    editor: {
      required: true
    }
  },

  components: {
    AppEditorSprite,
    AppSprite
  },

  data() {
    return {
      linkURL: '',

      image: null
    }
  },

  methods: {
    setLink() {
      this.$emit('setLink', this.linkURL)
      this.linkURL = ''
    },

    uploadImage() {
      const payload = {
        key: 'articles',
        value: this.image
      }

      this.$emit('uploadImage', payload)
      this.image = null
    }
  }
})

</script>
