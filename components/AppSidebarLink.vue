<template lang="pug">
  
  NuxtLink(
    :to="{ path: link.route }"
    :class="[{ '--current' : isCurrentRoute }, 'aside__nav-link']"
  ) {{ link.title }}

</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'AppSidebarLink',
  
  props: {
    link: {
      type: Object,
      required: true
    }
  },

  computed: {
    isCurrentRoute() {
      return this.$route.path.includes(this.link.route)
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.aside__nav-link {
  color: $darkModeBody;
  font-size: 14px;
  line-height: 30px;
  padding: 0 20px;
  display: block;

  &:hover,
  &.--current {
    background-color: $deepDark;
  }
}

</style>
