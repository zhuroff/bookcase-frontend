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
      AppSprite(name="list")

    .repeater__card-content
      NuxtLink(
        :to="{ path: `/lists/${card._id}` }"
        class="repeater__card-title"
      ) {{ card.title }}

</template>

<script lang="ts">

import RepeaterBasic from './mixins'

export default RepeaterBasic.extend({
  name: 'AppRepeaterInList',

  data() {
    return {
      id: this.card._id
    }
  }
})

</script>

<style lang="scss" scoped>

@import './style';

.repeater__card-content {
  align-self: center;
}

.repeater__card-title {
  margin-bottom: 0;
}

</style>
