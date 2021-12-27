<template lang="pug">

div.list
  
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'SingleListPage',

  async fetch() {
    await this.fetchList()
  },

  methods: {
    async fetchList() {
      try {
        const response = await this.$axios.get(`/api/lists/${this.$route.params.id}`)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
})

</script>
