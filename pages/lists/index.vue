<template lang="pug">
  
div.lists
  div(
    v-for="item in lists"
    :key="item._id"
  )
    NuxtLink(
      :to="{ path: `lists/${item._id}` }"
    ) {{ item.title }}

</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'ListsIndex',

  data() {
    return {
      lists: []
    }
  },

  async fetch() {
    await this.fetchLists()
  },

  methods: {
    async fetchLists() {
      const config = {
        page: 1,
        sort: { title: 1 },
        limit: 100,
        isDraft: false
      }

      try {
        const response = await this.$axios.post('/api/lists', config)
        this.lists = response.data.docs
      } catch (error) {
        console.error(error)
      }
    }
  }
})

</script>
