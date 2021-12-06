<template>
  <div id="container">
    <div>
      <button
        v-for="(item, index) in backupCollections"
        :key="index"
        @click="backupSave([item])"
      >Backup {{ item }}</button>
      <button @click="backupSave(backupCollections)">Backup all</button>
    </div>

    <div>
      <button
        v-for="(item, index) in backupCollections"
        :key="index"
        @click="backupRestore([item])"
      >Restore {{ item }}</button>
      <button @click="backupRestore(backupCollections)">Backup all</button>
    </div>

    <div>
      <button
        v-for="(item, index) in backupCollections"
        :key="index"
        @click="backupDownload(item)"
      >Download {{ item }}</button>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'BackupPage',

  data() {
    return {
      backupCollections: [] as string[]
    }
  },

  async fetch() {
    await this.fetchBackupLinks()
  },

  methods: {
    async fetchBackupLinks() {
      try {
        const response = await this.$axios.get('/api/backup/list')

        this.backupCollections = response.data.map((el: string) => {
          return el.replace(/\.[^/.]+$/, '')
        })
      } catch (error) {
        console.error(error)
      }
    },

    async backupSave(collection: string[]) {
      try {
        const backupQueryMap = collection.map(async (el: string) => {
          return await this.$axios.post(`/api/backup/save/${el}`)
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
          return await this.$axios.post(`/api/backup/restore/${el}`)
        })

        const response = await Promise.all(backupQueryMap)
        const responseMessages = response.map((el) => el.data)

        console.log(responseMessages)
      } catch (error) {
        console.error(error)
      }
    },

    async backupDownload(collection: string) {
      try {
        await this.$axios.post(`/api/backup/xlsx/${collection}`)
      } catch (error) {
        console.error(error)
      }
    }
  }
})

</script>
