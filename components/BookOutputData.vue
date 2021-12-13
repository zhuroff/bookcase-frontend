<template lang="pug">
  .output(:class="[{ '--disabled' : isDisabled }]")
    .output__card.card
      .output__header Cover type
      .output__cell
        BDropdown(
          position="is-top-right"
          :disabled="isDisabled"
        )
          template(#trigger="{ active }")
            BButton(
              :label="coverTypes[book.coverType]"
              :icon-right="active ? 'menu-up' : 'menu-down'"
              size="is-small"
            )
          BDropdownItem(
            v-for="option in coverTypesArr"
            :key="option.key"
          ) {{ option.value }}

    .output__card.card
      .output__header Format
      .output__cell
        BDropdown(
          position="is-top-right"
          :disabled="isDisabled"
        )
          template(#trigger="{ active }")
            BButton(
              :label="bookFormats[book.format]"
              :icon-right="active ? 'menu-up' : 'menu-down'"
              size="is-small"
            )
          BDropdownItem(
            v-for="option in bookFormatsArr"
            :key="option.key"
          ) {{ option.value }}

    .output__card.card
      .output__header Pages
      .output__cell
        BInput(
          type="number"
          :value="book.pages"
          :disabled="isDisabled"
          size="is-small"
        )

    .output__card.card
      .output__header Year
      .output__cell
        BInput(
          type="number"
          :value="book.publicationYear"
          :disabled="isDisabled"
          size="is-small"
        )
          
</template>

<script lang="ts">

import Vue from 'vue'
import { coverTypes, bookFormats } from '~/configs/localize'
import { FieldPayloadEmit, StringSignature } from '~/types/Global'

export default Vue.extend({
  props: {
    book: {
      type: Object,
      required: true
    },

    isDisabled: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    coverTypesArr(): FieldPayloadEmit[] {
      const result = Object.keys(this.coverTypes)
        .map((key: string) => ({
          key: key,
          value: this.coverTypes[key]
        }))

      return result
    },

    bookFormatsArr(): FieldPayloadEmit[] {
      const result = Object.keys(this.bookFormats)
        .map((key: string) => ({
          key: key,
          value: this.bookFormats[key]
        }))

      return result
    }
  },

  data() {
    return {
      coverTypes: coverTypes.ru as StringSignature,

      bookFormats: bookFormats.ru as StringSignature
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';
@import 'include-media';

.output {
  display: grid;
  grid-gap: 1rem;
  margin-bottom: 2rem;

  @include media("<tablet") {
    grid-template-columns: repeat(2, calc(100% - (50px / 3 + 1rem)));
  }

  @include media(">=tablet", "<laptop") {
    grid-template-columns: repeat(3, calc(50% - (50px / 3 + 1rem)));
  }

  @include media(">=laptop", "<desktop") {
    grid-template-columns: repeat(4, calc(33.3333% - (50px / 3 + 1rem)));
  }

  @include media(">=desktop") {
    grid-template-columns: repeat(5, calc(25% - (50px / 3 + 1rem)));
  }

  &__card {
    background-color: $middleDark;
    transition: box-shadow 0.2s ease;
    padding: 1rem;
  }

  &__header {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: $lightGray;
  }

  &:not(.--disabled) {

    .output__card {

      &:hover {
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
        transition: box-shadow 0.2s ease;
      }
    }
  }
}

</style>
