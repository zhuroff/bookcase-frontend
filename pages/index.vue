<template lang="pug">

  div.dashboard
    ul.dashboard__list
      li.dashboard__item(
        v-for="book in readingBooks"
        :key="book._id"
      )
        BookCardSmall(
          :book="book"
        )

</template>

<script lang="ts">

import Vue from 'vue'
import { mapGetters } from 'vuex'
import BookCardSmall from '~/components/BookCardSmall.vue'

export default Vue.extend({
  name: 'HomePage',

  components: {
    BookCardSmall
  },

  computed: {
    ...mapGetters({ readingBooks: 'dashboard/readingBooksState' })
  },

  async fetch() {
    await this.fetchReadingBooks()
  },

  methods: {
    async fetchReadingBooks () {
      await this.$store.dispatch('dashboard/fetchReadingBook')
    }
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
