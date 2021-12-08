<template lang="pug">
  
  div
    h1 Books page

</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'BooksIndex',
  
  data() {
    return {
      listViewConfig: {
        page: 1,
        sort: { dateCreated: -1 },
        limit: 30,
        isDraft: false
      }
    }
  },

  async fetch() {
    await this.fetchBooksList()
  },

  methods: {
    async fetchBooksList() {
      try {
        const response = await this.$axios.post('/api/books', this.listViewConfig)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
})

</script>
