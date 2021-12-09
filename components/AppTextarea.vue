<template>
  
  <textarea
    :placeholder="placeholder"
    :class="`textrow ${classname}`"
    :style="elementStyles"
    :disabled="isDisabled"
    v-model="text"
    ref="textElement"
    spellcheck="false"
    @input="typeText"
  ></textarea>

</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  props: {
    content: {
      type: String,
      required: false,
      default: ''
    },

    initHeight: {
      type: Number,
      required: true,
      validator: (value) => value > 0
    },

    placeholder: {
      type: String,
      required: false,
      default: ''
    },

    propKey: {
      type: String,
      required: true
    },

    classname: {
      type: String,
      required: false,
      default: ''
    },

    isDisabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  mounted() {
    this.resizeTextarea()
    window.onresize = this.resizeTextarea
  },

  computed: {
    elementStyles() {
      return { 'height': `${this.initHeight}px` }
    }
  },

  watch: {
    content(newValue: string) {
      this.text = newValue
      this.resizeTextarea()
    }
  },

  data() {
    return {
      text: this.content
    }
  },

  methods: {
    resizeTextarea() {
      if (this.$refs.textElement) {
        this.$refs.textElement.style.height = `${this.initHeight}px`
        this.$refs.textElement.style.height = `${this.$refs.textElement.scrollHeight}px`
      }
    },

    typeText() {
      this.resizeTextarea()

      const payload = {
        key: this.propKey,
        value: this.text
      }

      this.$emit('typeText', payload)
    }
  }
})

</script>

<style lang="scss" scoped>

.textrow {
  overflow-y: hidden;
}

</style>