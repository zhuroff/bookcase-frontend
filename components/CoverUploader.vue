<template lang="pug">
  
  .card
    .card-image(v-if="typeof image === 'string' && image.length")
      figure.image
        img(:src="'/uploads' + image")
        
    BField(
      v-if="!isDisabled"
      class="card-uploader"
    )
      BUpload(
        v-model="file"
        @input="updateCover"
        drag-drop
      )
        section.section
          .content.has-text-centered
            p
              BIcon(
                icon="upload"
                size="is-large"
              )
            p Drop file here or click to upload

</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'CoverUploader',

  props: {
    propKey: {
      type: String,
      required: true
    },

    image: {
      required: false
    },

    isDisabled: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      file: null
    }
  },

  methods: {
    updateCover() {
      const payload = {
        key: this.propKey,
        value: this.file
      }

      this.$emit('updateCover', payload)
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.card {
  position: relative;
  margin-bottom: 1rem;

  &-image {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }

  &-uploader {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: $transDark;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transition: opacity 0.3s $animation;
  }

  &:hover {

    .card-uploader {
      opacity: 1;
      transition: opacity 0.3s $animation;
    }
  }
}

</style>
