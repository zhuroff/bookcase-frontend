<template lang="pug">

  main.main-default
    AppSidebar
    .main__workspace
      AppHeader
      simplebar(data-simplebar-auto-hide="false")
        section.section
          Nuxt
    
</template>

<script lang="ts">

import Vue from 'vue'
import simplebar from 'simplebar-vue'
import AppSidebar from '~/components/AppSidebar.vue'
import AppHeader from '~/components/AppHeader.vue'

export default Vue.extend({
  name: 'DefaultLayout',

  components: {
    simplebar,
    AppSidebar,
    AppHeader
  },

  middleware: ['authorization']
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.main-default {
  display: grid;
  grid-template-columns: $sidebarWidth 1fr;
  min-height: 100vh;
}

[data-simplebar] {
  height: calc(100vh - #{$headerHeight});
}

.section {
  background-color: $deepDark;
  min-height: calc(100vh - #{$headerHeight});
}

</style>
