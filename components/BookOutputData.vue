<template lang="pug">
  table
    thead
      tr
        th Cover type
        th Format
        th Pages
        th Year
    tbody
      tr
        td
          BDropdown(position="is-top-right")
            template(#trigger="{ active }")
              BButton(
                :label="coverTypes[book.coverType]"
                :icon-right="active ? 'menu-up' : 'menu-down'"
                type="is-primary"
              )
            BDropdownItem(
              v-for="option in coverTypesArr"
              :key="option.key"
            ) {{ option.value }}

        td
          BDropdown(position="is-top-right")
            template(#trigger="{ active }")
              BButton(
                :label="bookFormats[book.format]"
                :icon-right="active ? 'menu-up' : 'menu-down'"
                type="is-primary"
              )
            BDropdownItem(
              v-for="option in bookFormatsArr"
              :key="option.key"
            ) {{ option.value }}

        td
          BInput(
            type="number"
            :value="book.pages"
          )

        td
          BInput(
            type="number"
            :value="book.publicationYear"
          )
</template>

<script lang="ts">

import Vue from 'vue'
import { coverTypes, bookFormats } from '~/configs/localize'

export default Vue.extend({
  props: {
    book: {
      type: Object,
      required: true
    }
  },

  computed: {
    coverTypesArr() {
      const result = Object.keys(this.coverTypes)
        .map((key: string) => ({
          key: key,
          value: this.coverTypes[key] as string
        }))

      return result
    },

    bookFormatsArr() {
      const result = Object.keys(this.bookFormats)
        .map((key: string) => ({
          key: key,
          value: this.bookFormats[key] as string
        }))

      return result
    }
  },

  data() {
    return {
      coverTypes: coverTypes.ru,

      bookFormats: bookFormats.ru
    }
  }
})

</script>
