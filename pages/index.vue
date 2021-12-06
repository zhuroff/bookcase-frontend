<template>
  <div id="container">
    <button @click="backup(['books'])">Backup books</button>
    <button @click="backup(['authors'])">Backup authors</button>
    <button @click="backup(['genres'])">Backup genres</button>
    <button @click="backup(['lists'])">Backup lists</button>
    <button @click="backup(['publishers'])">Backup publishers</button>
    <button @click="backup(['series'])">Backup series</button>
    <button @click="backup(backupCollections)">Backup all</button>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'HomePage',

  data() {
    return {
      backupCollections: [
        'books',
        'authors',
        'genres',
        'lists',
        'publishers',
        'series'
      ],

      readingBooks: {
        isFetched: false,
        data: []
      }
    }
  },

  async fetch() {
    // await this.fetchReadingBooks()
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
    },

    async backup(collection: string[]) {
      try {
        const backupQueryMap = collection.map(async (el: string) => {
          return await this.$axios.post(`/api/backup/${el}`)
        })

        const response = await Promise.all(backupQueryMap)
        const responseMessages = response.map((el) => el.data)

        console.log(responseMessages)
      } catch (error) {
        console.error(error)
      }
    }
  }
})

</script>
