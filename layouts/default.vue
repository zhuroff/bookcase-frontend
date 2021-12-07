<template>
  <main class="main-default">
    <Nuxt />
  </main>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'DefaultLayout',

  middleware: ['authorization']
})

</script>
