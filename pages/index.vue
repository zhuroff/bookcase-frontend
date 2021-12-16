<template lang="pug">

  div.dashboard
    .dashboard__title
      span Reading now
    ul.dashboard__list
      li.dashboard__item(
        v-for="book in readingBooks"
        :key="book._id"
      )
        BookCardSmall(
          :book="book"
        )

    .dashboard__title
      span Read completely ({{ readBooksPages }} pages)
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
      readBooks: 'dashboard/readBooksState'
    }),

    readBooksPages() {
       return this.$store.getters['dashboard/readBooksState']
         .reduce((acc: number, next: BasicBook) => acc + next.pages, 0)
         .toLocaleString('ru-RU')
    }
  },

  async fetch() {
    await this.$store.dispatch('dashboard/fetchReadingBooks')
    await this.$store.dispatch('dashboard/fetchReadBooks', this.$store.getters['dashboard/readYearState'])
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';
@import 'include-media';

.dashboard {

  &__list {
    display: grid;
    grid-gap: 1rem;

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
