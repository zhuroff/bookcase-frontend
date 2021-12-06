<template>
  <div id="container">
    <div>
      <button @click="backupSave(['books'])">Backup books</button>
      <button @click="backupSave(['authors'])">Backup authors</button>
      <button @click="backupSave(['genres'])">Backup genres</button>
      <button @click="backupSave(['lists'])">Backup lists</button>
      <button @click="backupSave(['publishers'])">Backup publishers</button>
      <button @click="backupSave(['series'])">Backup series</button>
      <button @click="backupSave(backupCollections)">Backup all</button>
    </div>

    <div>
      <button @click="backupRestore(['books'])">Restore books</button>
      <button @click="backupRestore(['authors'])">Restore authors</button>
      <button @click="backupRestore(['genres'])">Restore genres</button>
      <button @click="backupRestore(['lists'])">Restore lists</button>
      <button @click="backupRestore(['publishers'])">Restore publishers</button>
      <button @click="backupRestore(['series'])">Restore series</button>
      <button @click="backupRestore(backupCollections)">Restore all</button>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'BackupPage',

  data() {
    return {
      backupCollections: [
        'books',
        'authors',
        'genres',
        'lists',
        'publishers',
        'series'
      ]
    }
  },

  methods: {
    async backupSave(collection: string[]) {
      try {
        const backupQueryMap = collection.map(async (el: string) => {
          return await this.$axios.post(`/api/backup/${el}/save`)
        })

        const response = await Promise.all(backupQueryMap)
        const responseMessages = response.map((el) => el.data)

        console.log(responseMessages)
      } catch (error) {
        console.error(error)
      }
    },

    async backupRestore(collection: string[]) {
      try {
        const backupQueryMap = collection.map(async (el: string) => {
          return await this.$axios.post(`/api/backup/${el}/restore`)
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
