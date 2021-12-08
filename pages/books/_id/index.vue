<template lang="pug">
  
  div
    h1 Single book page

</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'SingleBookPage',

  async fetch() {
    await this.fetchBook()
  },

  methods: {
    async fetchBook() {
      try {
        const response = await this.$axios.get(`/api/books/${this.$route.params.id}`)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
})

</script>
