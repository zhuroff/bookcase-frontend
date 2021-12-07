<template>
  <main class="main-auth">
    <Nuxt />
  </main>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'AuthLayout'
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.main-auth {
  background: $dark url(https://phonoteka.org/uploads/posts/2021-04/1619749696_4-phonoteka_org-p-prozrachnii-fon-dlya-saita-4.png) center/cover no-repeat;
  // background: $dark url(https://phonoteka.org/uploads/posts/2021-04/1619525559_6-phonoteka_org-p-fon-s-tochkami-dlya-fotoshopa-8.png) center/cover no-repeat;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
