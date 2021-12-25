<template lang="pug">
  
  .card(
    :class="[{ '--disabled' : isDisabled }, 'repeater__card']"
    @click="clickCardHandler"
  )
    AppRepeaterDelete(
      v-if="isDeletable && !isDisabled"
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

      BDropdown(
        position="is-top-right"
        :disabled="isDisabled"
        v-model="selectedRole"
        @input="selectRole"
      )
        template(#trigger="{ active }")
          BButton(
            :label="currentRole"
            :icon-right="active ? 'menu-up' : 'menu-down'"
            size="is-small"
          )
        BDropdownItem(
          v-for="option in authorRolesArr"
          :key="option.key"
          :value="option.key"
        ) {{ option.value }}

</template>

<script lang="ts">

import { authorRoles } from '~/configs/localize'
import { FieldPayloadEmit, StringSignature } from '../../types/Global'
import { BookAuthorRole } from '../../types/Book'
import RepeaterBasic from './mixins'

export default RepeaterBasic.extend({
  name: 'AppRepeaterAuthor',

  computed: {
    authorRolesArr(): FieldPayloadEmit[] {
      const result = Object.keys(this.authorRoles)
        .map((key: string) => ({
          key: key,
          value: this.authorRoles[key]
        }))

      return result
    },

    currentRole(): string {
      return this.authorRoles[this.selectedRole]
    }
  },

  data() {
    return {
      authorRoles: authorRoles.ru as StringSignature,

      role: this.card.role,

      id: this.card.author._id,

      selectedRole: this.card.role || ''
    }
  },

  methods: {
    selectRole() {
      const payload: BookAuthorRole = {
        id: (this as any).id,
        role: this.selectedRole
      }

      this.$emit('setAuthorRole', payload)
    }
  }
})

</script>

<style lang="scss" scoped>

@import './style';

</style>
