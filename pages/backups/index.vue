<template>
  <div id="container">
    <button @click="backupSave()">Backup</button>
    <ul>
      <li
        v-for="item in backupList"
        :key="item.timestamp"
      >
        <span>{{ item.dateCreation }}</span>
        <button @click="backupRestore(item.timestamp)">Restore</button>
        <button @click="backupDelete(item.timestamp)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'

interface BackupList {
  timestamp: number
  dateCreation: string
}

export default Vue.extend({
  name: 'BackupPage',

  data() {
    return {
      backupList: [] as BackupList[]
    }
  },

  async fetch() {
    await this.fetchBackupList()
  },

  methods: {
    async fetchBackupList() {
      try {
        const response = await this.$axios.get('/api/backup/list')
        this.setBackupList(response.data)
      } catch (error) {
        console.error(error)
      }

      // try {
      //   const response = await this.$axios.post('/api/backup/ref')
      //   console.log(response)
      // } catch (error) {
      //   console.error(error)
      // }
    },

    setBackupList(data: string[]) {
      const dateConfig = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      } as const

      this.backupList = data.map((el: string) => ({
        timestamp: Number(el),
        dateCreation: new Date(Number(el)).toLocaleDateString('ru-RU', dateConfig)
      }))
    },

    async backupSave() {
      try {
        const response = await this.$axios.post('/api/backup/save')
        this.fetchBackupList()
        //console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    },

    async backupRestore(timestamp: number) {
      try {
        const response = await this.$axios.post(`/api/backup/restore/${timestamp}`)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    },

    async backupDelete(timestamp: number) {
      try {
        const response = await this.$axios.delete(`/api/backup/${timestamp}`)
        console.log(response.data)
        this.fetchBackupList()
      } catch (error) {
        console.error(error)
      }
    }
  }
})

</script>
