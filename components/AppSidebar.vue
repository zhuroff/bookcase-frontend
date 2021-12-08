<template lang="pug">
  
  aside.aside
    .aside__header
      NuxtLink(
        to="/"
        class="aside__header-link"
      )
        AppSprite(name="logo")
        span BookCase

    nav.aside__nav
      ul.aside__nav-list
        li.aside__nav-item(
          v-for="item in navigation"
          :key="item.route"
        )
          AppSidebarLink(:link="item")

</template>

<script lang="ts">

import Vue from 'vue'
import AppSprite from '~/components/AppSprite.vue'
import AppSidebarLink from '~/components/AppSidebarLink.vue'

export default Vue.extend({
  name: 'AppSidebar',

  components: {
    AppSprite,
    AppSidebarLink
  },

  filters: {
    isCurrentRoute(route: string) {
      console.log(route)
      return false
    }
  },

  data() {
    return {
      navigation: [
        {
          route: '/books',
          title: 'Books'
        },
        {
          route: '/authors',
          title: 'Authors'
        },
        {
          route: '/genres',
          title: 'Genres'
        },
        {
          route: '/publishers',
          title: 'Publishers'
        },
        {
          route: '/series',
          title: 'Series'
        },
        {
          route: '/lists',
          title: 'Lists'
        }
      ]
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.aside {
  position: sticky;
  z-index: 3000;
  top: 0;
  height: 100vh;
  background-color: $middleDark;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;

  &__header {
    height: $headerHeight;
    padding: 0 20px;

    &-link {
      display: flex;
      align-items: center;
      height: inherit;
      color: $darkModeBody;
      font-size: 14px;

      .icon-logo {
        width: 25px;
        height: 25px;
        fill: $darkModeBody;
        margin-right: 10px;
      }
    }
  }

  &__nav {
    padding: 20px 0;
  }
}

</style>
