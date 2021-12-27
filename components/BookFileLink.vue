<template lang="pug">

.bookfile
  BButton(
    v-if="file && $route.name === 'books-id'"
    :href="file"
    tag="a"
    target="_blank"
    size="is-small"
    type="is-primary"
  ) Book file

  BInput(
    v-if="$route.name === 'books-id-edit'"
    :value="file || ''"
    placeholder="Book file link"
    @input="updateBookFileLink"
  )

</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'BookFileLink',

  props: {
    file: {
      type: String,
      required: false
    }
  },

  methods: {
    updateBookFileLink(value: string) {
      this.$store.commit('book/updateFileLink', value)
    }
  }
})

</script>
