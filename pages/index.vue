<template>
  <div>Index page</div>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'HomePage',

  data() {
    return {
      obj: {}
    }
  },

  async fetch() {
    this.fetchTestData()
  },

  methods: {
    fetchTestData() {
      this.$axios.get('/api/test')
        .then((response: any) => console.log(response.data))
        .catch((error: any) => console.error(error))
    }
  }
})

</script>
