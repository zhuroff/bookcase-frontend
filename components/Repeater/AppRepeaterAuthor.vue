<template lang="pug">
  
  .card(
    :class="[{ '--disabled' : isDisabled }, 'repeater__card']"
    @click="clickCardHandler"
  )
    AppRepeaterDelete(
      v-if="isDeletable"
      @deleteCard="deleteCard"
    )

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
      NuxtLink(
        :to="{ path: `/authors/${card.author._id}` }"
        class="repeater__card-title"
      ) {{ card.author.title }}

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

import { authorRoles } from '~/configs/localize'
import { StringSignature } from '~/types/Global'
import RepeaterBasic from './mixins'

export default RepeaterBasic.extend({
  name: 'AppRepeaterAuthor',

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
      role: this.card.role,
      id: this.card.author._id
    }
  }
})

</script>

<style lang="scss" scoped>

@import './style';

</style>
