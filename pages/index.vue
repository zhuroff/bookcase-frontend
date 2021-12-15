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

.dashboard {

  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
  }
}

</style>
