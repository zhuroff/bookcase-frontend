<template lang="pug">
  
  header.header
    .header__account
      button.header__account-button
        AppSprite(name="user")
      nav.header__account-nav
        ul.header__account-navlist
          li.header__account-navitem(
            v-for="item in navigation"
            :key="item.route"
          )
            AppHeaderLink(:link="item")

</template>

<script lang="ts">

import Vue from 'vue'
import AppSprite from '~/components/AppSprite.vue'
import AppHeaderLink from '~/components/AppHeaderLink.vue'

export default Vue.extend({
  name: 'AppHeader',
  
  components: {
    AppSprite,
    AppHeaderLink
  },

  data() {
    return {
      navigation: [
        {
          route: '/account',
          title: 'Account'
        },
        {
          route: '/backups',
          title: 'Backups'
        },
        {
          route: '/auth/logout',
          title: 'Logout'
        }
      ]
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

@mixin visibleNavState {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  transition: all 0.5s $animation;
}

.header {
  background-color: $middleDark;
  height: $headerHeight;
  position: sticky;
  top: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  padding: 0 1.6rem 0 3rem;

  &__account {
    margin-left: auto;
    position: relative;

    &-button {
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: $headerHeight;
      height: $headerHeight;
      // outline: none;
      border: 0;
      background-color: transparent;

      .icon-user {
        width: 20px;
        height: 20px;
        fill: $darkModeBody;
        stroke: $darkModeBody;
      }

      &:focus {

        & + .header__account-nav {
          @include visibleNavState;
        }
      }
    }

    &-nav {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: $middleDark;
      padding: 20px 0;
      border-radius: 0.25rem;
      min-width: $sidebarWidth;
      text-align: right;
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
      pointer-events: none;
      transform: translateY(-25px);
      opacity: 0;
      transition: all 0.5s $animation;
    }

    &:hover {

      .header__account-nav {
        @include visibleNavState;
      }
    }
  }
}

</style>
