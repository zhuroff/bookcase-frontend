<template lang="pug">
  
.repeater
  .repeater__title(v-if="title") {{ title }}
  ul.repeater__list
    li.repeater__item(
      v-for="item in items"
      :key="item._id"
    )
      component(
        :is="cardComponent"
        :card="item"
        :isDisabled="isDisabled"
      )

    li.repeater__item.--add(v-if="!isDisabled")
      button(
        type="button"
        class="card repeater__card_add"
      )
        AppSprite(name="plus")

</template>

<script lang="ts">

import Vue from 'vue'
import AppSprite from '~/components/AppSprite.vue'
import AppRepeaterAuthor from './AppRepeaterAuthor.vue'
import AppRepeaterPublisher from './AppRepeaterPublisher.vue'

export default Vue.extend({
  name: 'AppRepeater',

  components: {
    AppSprite,
    AppRepeaterAuthor,
    AppRepeaterPublisher
  },

  props: {
    title: {
      type: String,
      required: false
    },

    componentKey: {
      type: String,
      required: true
    },

    items: {
      type: Array,
      required: true
    },

    isDisabled: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    cardComponent() {
      return (this as any).components[this.componentKey as string]
    }
  },

  data() {
    return {
      components: {
        authors: AppRepeaterAuthor,
        publishers: AppRepeaterPublisher
      }
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.repeater {
  margin-bottom: 2rem;
  padding: 0 0.5rem;

  &__title {
    color: $lightGray;
    font-size: 1rem;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -0.5rem;
  }

  &__item {
    flex: 1 1 0;
    padding: 0.5rem;

    &.--add {
      width: 99px;
    }
  }

  &__card {

    &_add {
      height: 99px;
      width: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: none;
      border: 0;
      padding: 0;
      background-color: $middleDark;
      transition: box-shadow 0.2s ease;

      .icon-plus {
        width: 50px;
        height: 50px;
        stroke: $deepDark;
      }

      &:hover {
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
        transition: box-shadow 0.2s ease;
      }
    }
  }
}

</style>
