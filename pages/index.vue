<template lang="pug">

  div.dashboard
    .dashboard__heading
      h2.dashboard__title Reading now

    ul.dashboard__list
      li.dashboard__item(
        v-for="book in readingBooks"
        :key="book._id"
      )
        BookCardSmall(
          :book="book"
        )

    .dashboard__heading
      h2.dashboard__title Read completely in {{ readYearState }} ({{ readBooksPages }} pages)
      BDropdown(@change="setReadingYear")
        template(#trigger="{ active }")
          BButton(
            type="is-default"
            size="is-small"
            :icon-right="active ? 'menu-up' : 'menu-down'"
            :label="readYearState"
          )
        BDropdownItem(
          v-for="item in readingYears"
          :key="item"
          :value="item"
        ) {{ item }}

    ul.dashboard__list
      li.dashboard__item(
        v-for="book in readBooks"
        :key="book._id"
      )
        BookCardSmall(
          :book="book"
        )

</template>

<script lang="ts">

import Vue from 'vue'
import { mapGetters } from 'vuex'
import { BasicBook } from '~/types/Book'
import BookCardSmall from '~/components/BookCardSmall.vue'

export default Vue.extend({
  name: 'HomePage',

  components: {
    BookCardSmall
  },

  computed: {
    ...mapGetters({
      readingBooks: 'dashboard/readingBooksState',
      readBooks: 'dashboard/readBooksState',
      readYearState: 'dashboard/readYearState'
    }),

    readBooksPages() {
       return this.$store.getters['dashboard/readBooksState']
         .reduce((acc: number, next: BasicBook) => acc + next.pages, 0)
         .toLocaleString('ru-RU')
    },

    readingYears() {
      const readingStart = 2010
      const readingNow = new Date().getFullYear() + 1

      return Array.from(
        { length: readingNow - readingStart },
        (a, b) => b += readingStart
      ).reverse()
    }
  },

  async fetch() {
    await this.$store.dispatch('dashboard/fetchReadingBooks')
    await this.$store.dispatch('dashboard/fetchReadBooks', this.$store.getters['dashboard/readYearState'])
  },

  methods: {
    setReadingYear(year: number) {
      this.$store.commit('dashboard/updateReadingYear', year)
      this.$store.dispatch('dashboard/fetchReadBooks', year)
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';
@import 'include-media';

.dashboard {

  &__heading {
    display: flex;
    margin-bottom: 1rem;
  }

  &__title {
    color: $darkModeBody;
    font-size: 1.25rem;
  }

  &__list {
    display: grid;
    grid-gap: 1rem;
    margin-bottom: 3rem;

    @include media("<tablet") {
      grid-template-columns: repeat(1, 1fr);
    }

    @include media(">=tablet", "<laptop") {
      grid-template-columns: repeat(2, 1fr);
    }

    @include media(">=laptop", "<desktop") {
      grid-template-columns: repeat(3, 1fr);
    }

    @include media(">=desktop") {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

</style>
