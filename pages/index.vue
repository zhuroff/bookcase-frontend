<template lang="pug">

  div
    ul.columns.is-multiline
      li.column(
        v-for="book in readingBooks.data"
        :key="book._id"
        class="is-one-quarter"
      )
        BookCardSmall(
          :book="book"


        )

</template>

<script lang="ts">

import Vue from 'vue'
import BookCardSmall from '~/components/BookCardSmall.vue'

export default Vue.extend({
  name: 'HomePage',

  components: {
    BookCardSmall
  },

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
