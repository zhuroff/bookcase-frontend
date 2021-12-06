<template>
  <h1>Index page</h1>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'HomePage',

  data() {
    return {
      readingBooks: {
        isFetched: false,
        data: []
      }
    }
  },

  async fetch() {
    await this.fetchReadingBooks()
  },

  methods: {
    async fetchReadingBooks () {
      try {
        const response = await this.$axios.get('/api/dashboard/reading-books')
        console.log(response.data)
      
        this.readingBooks = {
          isFetched: true,
          data: response.data
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})

</script>
