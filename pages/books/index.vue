<template lang="pug">
  
  div
    AppActions(
      @createNewEntry="createNewBook"
    )

</template>

<script lang="ts">

import Vue from 'vue'
import AppActions from '~/components/AppActions.vue'

export default Vue.extend({
  name: 'BooksIndex',

  components: {
    AppActions
  },
  
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
