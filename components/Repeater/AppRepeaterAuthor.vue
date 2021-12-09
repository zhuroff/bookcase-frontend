<template lang="pug">
  
  .card(:class="[{ '--disabled' : isDisabled }, 'repeater__card']")
    .repeater__card-image
      img(
        v-if="card.author.picture"
        :src="'/uploads' + card.author.picture"
        :alt="card.author.title"
      )

      AppSprite(
        v-else
        name="person"
      )

    .repeater__card-content
      .repeater__card-title {{ card.author.title }}
      select(
        :disabled="isDisabled"
        v-model="role"
        class="repeater__card-description"
      )
        option(
          v-for="item in authorRoles"
          :key="item.key"
          :value="item.key"
        ) {{ item.value }}

</template>

<script lang="ts">

import Vue from 'vue'
import { authorRoles } from '~/configs/localize'
import { StringSignature } from '~/types/Global'
import AppSprite from '~/components/AppSprite.vue'

export default Vue.extend({
  name: 'AppRepeaterAuthor',

  components: {
    AppSprite
  },

  props: {
    card: {
      type: Object,
      required: true
    },

    isDisabled: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    authorRoles() {
      return Object.keys(authorRoles.ru).map((key: any) => ({
        value: (authorRoles.ru as StringSignature)[key],
        key: key
      }))
    }
  },

  data() {
    return {
      roles: authorRoles,
      role: this.card.role
    }
  }
})

</script>

<style lang="scss" scoped>

@import './style';

</style>
