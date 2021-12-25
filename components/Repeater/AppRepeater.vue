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
        :isDeletable="items.length > 1"
        :componentKey="componentKey"
        @repeaterCardClick="repeaterCardClick"
        @deleteCard="deleteCard"
        @setAuthorRole="setAuthorRole"
        @updateEditionInfo="updateEditionInfo"
      )

    li.repeater__item.--add(v-if="!isDisabled")
      button(
        type="button"
        class="card repeater__card_add"
        @click="callRepeaterModal"
      )
        AppSprite(name="plus")

</template>

<script lang="ts">

import Vue from 'vue'
import { FieldPayloadEmit } from '../../types/Global'
import { BookAuthorRole, EditionInfo } from '../../types/Book'
import AppSprite from '~/components/AppSprite.vue'
import AppRepeaterAuthor from './AppRepeaterAuthor.vue'
import AppRepeaterPublisher from './AppRepeaterPublisher.vue'
import AppRepeaterGenre from './AppRepeaterGenre.vue'
import AppRepeaterSeries from './AppRepeaterSeries.vue'
import AppRepeaterList from './AppRepeaterList.vue'

export default Vue.extend({
  name: 'AppRepeater',

  components: {
    AppSprite,
    AppRepeaterAuthor,
    AppRepeaterPublisher,
    AppRepeaterGenre,
    AppRepeaterSeries,
    AppRepeaterList
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
        publishers: AppRepeaterPublisher,
        genres: AppRepeaterGenre,
        series: AppRepeaterSeries,
        lists: AppRepeaterList
      }
    }
  },

  methods: {
    repeaterCardClick(payload: FieldPayloadEmit) {
      this.$emit('repeaterCardClick', payload)
    },

    deleteCard(payload: FieldPayloadEmit) {
      this.$emit('deleteCard', payload)
    },

    callRepeaterModal() {
      this.$emit('callRepeaterModal', this.componentKey)
    },

    setAuthorRole(payload: BookAuthorRole) {
      this.$emit('setAuthorRole', payload)
    },

    updateEditionInfo(payload: EditionInfo) {
      this.$emit('updateEditionInfo', payload)
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';
@import 'include-media';

.repeater {
  margin-bottom: 2rem;

  &__title {
    color: $lightGray;
    font-size: 1rem;
  }

  &__list {
    display: grid;
    grid-gap: 1rem;
    margin-top: 0.5rem;

    @include media("<tablet") {
      grid-template-columns: repeat(1, calc(100% - (50px / 3 + 1rem)));
    }

    @include media(">=tablet", "<laptop") {
      grid-template-columns: repeat(2, calc(50% - (50px / 3 + 1rem)));
    }

    @include media(">=laptop", "<desktop") {
      grid-template-columns: repeat(3, calc(33.3333% - (50px / 3 + 1rem)));
    }

    @include media(">=desktop") {
      grid-template-columns: repeat(4, calc(25% - (50px / 3 + 1rem)));
    }
  }

  &__item {

    &.--add {
      width: 50px;
    }
  }

  &__card {

    &_add {
      height: 50px;
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
        width: 30px;
        height: 30px;
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
