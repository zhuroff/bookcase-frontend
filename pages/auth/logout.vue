<template>
  <h1>Logout page</h1>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  layout: 'auth',

  middleware: ['authorization'],

  beforeCreate () {
    this.$store.dispatch('auth/logout')
    this.$router.push('/auth')
  }
})

</script>
