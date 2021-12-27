<template lang="pug">
  
  div.books
    AppActions(
      @createNewEntry="createNewBook"
    )

    ul.books__list(v-if="books.length")
      li.books__item(
        v-for="book in books"
        :key="book._id"
      )
        BookCardSmall(
          :book="book"
        )

</template>

<script lang="ts">

import Vue from 'vue'
import AppActions from '~/components/AppActions.vue'
import BookCardSmall from '~/components/BookCardSmall.vue'

export default Vue.extend({
  name: 'BooksIndex',

  components: {
    AppActions,
    BookCardSmall
  },
  
  data() {
    return {
      listViewConfig: {
        page: 1,
        sort: { dateCreated: -1 },
        limit: 30,
        isDraft: false
      },

      books: []
    }
  },

  async fetch() {
    await this.fetchBooksList()
  },

  methods: {
    async fetchBooksList() {
      try {
        const response = await this.$axios.post('/api/books', this.listViewConfig)
        this.books = response.data.docs
      } catch (error) {
        console.error(error)
      }
    },

    async createNewBook() {
      try {
        const response = await this.$axios.post('/api/books/create')

        if (response.status === 201) {
          this.$router.push({ path: `/books/${response.data._id}/edit` })
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})

</script>

<style lang="scss" scoped>

.books__list {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
}

</style>
