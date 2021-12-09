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
        v-if="card.publisher.picture"
        :src="'/uploads' + card.publisher.picture"
        :alt="card.publisher.title"
      )

      AppSprite(
        v-else
        name="building"
      )

    .repeater__card-content
      NuxtLink(
        :to="{ path: `/publishers/${card.publisher._id}` }"
        class="repeater__card-title"
      ) {{ card.publisher.title }}

      input(
        :disabled="isDisabled"
        v-model="code"
        placeholder="Book code"
        class="repeater__card-description"
      )

      input(
        :disabled="isDisabled"
        v-model="city"
        placeholder="City"
        class="repeater__card-description"
      )

</template>

<script lang="ts">

import RepeaterBasic from './mixins'

export default RepeaterBasic.extend({
  name: 'AppRepeaterAuthor',

  data() {
    return {
      code: this.card.code,
      city: this.card.city,
      id: this.card.publisher._id
    }
  }
})

</script>

<style lang="scss" scoped>

@import './style';

</style>
