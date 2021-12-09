<template lang="pug">
  
  .card(:class="[{ '--disabled' : isDisabled }, 'repeater__card']")
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
      .repeater__card-title {{ card.publisher.title }}
      input(
        :disabled="isDisabled"
        v-model="code"
        class="repeater__card-description"
      )

      input(
        :disabled="isDisabled"
        v-model="city"
        class="repeater__card-description"
      )

</template>

<script lang="ts">

import Vue from 'vue'
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

  data() {
    return {
      code: this.card.code,
      city: this.card.city
    }
  }
})

</script>

<style lang="scss" scoped>

@import './style';

</style>
