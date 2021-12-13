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

      BInput(
        type="text"
        size="is-small"
        v-model="city"
        placeholder="City"
        :disabled="isDisabled"
      )

      BInput(
        type="text"
        size="is-small"
        v-model="code"
        placeholder="Book code"
        :disabled="isDisabled"
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
