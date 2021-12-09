<template lang="pug">
  
  div.book
    form.book__form
      AppTextarea(
        placeholder="Book title"
        classname="book__title"
        propKey="title"
        :initHeight="52"
        :content="book.title"
        :isDisabled="false"
        @typeText="updateBookInstance"
      )

      p Something below...

    BButton(
      tag="router-link"
      :to="{ path: `/books/${$route.params.id}`}"
    ) Cancel

</template>

<script lang="ts">

import Vue from 'vue'
import { mapGetters } from 'vuex'
import AppTextarea from '~/components/AppTextarea.vue'

interface FieldPayloadEmit {
  key: string
  value: string | number | boolean
}

export default Vue.extend({
  name: 'SingleBookPage',

  components: {
    AppTextarea
  },

  computed: {
    ...mapGetters({ book: 'book/book' })
  },

  beforeDestroy() {
    if (this.$route.name !== 'books-id') {
      this.$store.commit('book/clearfy')
    }
  },

  async fetch() {
    await this.fetchBook()
  },

  data() {
    return {
      editedBook: {}
    }
  },

  methods: {
    async fetchBook() {
      try {
        await this.$store.dispatch('book/fetchBook', this.$route.params.id)
      } catch (error) {
        console.error(error)
      }
    },

    updateBookInstance(payload: FieldPayloadEmit) {
      this.editedBook[payload.key] = payload.value
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.book {

  input,
  textarea {
    color: $darkModeBody;
  }

  textarea {
    resize: none;
  }

  &__title {
    font-size: 1.5rem;
    color: $darkModeBody;
    outline: none;
    line-height: 2.5rem;
    padding-bottom: 0.75rem;
    background-color: transparent;
    display: block;
    width: 100%;
    border: 0;

    &:not([disabled]) {
      border-bottom: 1px solid $lightGray;
    }
  }
}

</style>
