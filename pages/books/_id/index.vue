<template lang="pug">
  
  div.book
    BookForm(
      :book="book"
      :isDisabled="true"
    )

    .book__footer
      BButton(
        size="is-small"
        type="is-info"
        @click="$router.go(-1)"
      ) Back

      BButton(
        tag="router-link"
        size="is-small"
        type="is-info"
        :to="{ path: `/books/${$route.params.id}/edit`}"
      ) Edit

      BButton(
        size="is-small"
        type="is-info"
      ) Delete

      BButton(
        size="is-small"
        type="is-info"
      ) To draft

</template>

<script lang="ts">

import Vue from 'vue'
import { mapGetters } from 'vuex'
import BookForm from './BookForm.vue'

export default Vue.extend({
  name: 'SingleBookPage',

  components: {
    BookForm
  },

  computed: {
    ...mapGetters({ book: 'book/book' })
  },

  beforeDestroy() {
    if (this.$route.name !== 'books-id-edit') {
      this.$store.commit('book/clearfy')
    }
  },

  async fetch() {
    await this.fetchBook()
  },

  methods: {
    async fetchBook() {
      try {
        await this.$store.dispatch('book/fetchBook', this.$route.params.id)
      } catch (error) {
        console.error(error)
      }
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.book {

  &__footer {
    background-color: $middleDark;
    position: fixed;
    bottom: 0;
    z-index: 2000;
    height: $headerHeight;
    padding: 0 3rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    left: $sidebarWidth;
    width: calc(100vw - #{$sidebarWidth});

    .button {
      margin: 0 5px;
    }
  }
}

</style>
