<template lang="pug">
  
  div.book
    BookForm(
      :book="book"
      :isDisabled="false"
      @updateBookInstance="updateBookInstance"
    )

    .book__footer
      BButton(
        tag="router-link"
        size="is-small"
        type="is-info"
        :to="{ path: `/books/${$route.params.id}`}"
      ) Cancel

      BButton(
        size="is-small"
        type="is-info"
      ) Save

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
import { FieldPayloadEmit } from '~/types/Global'

interface BookSignatures {
  [index: string]: string | number | Blob | boolean
}

export default Vue.extend({
  name: 'SingleBookEdit',

  components: {
    BookForm
  },

  computed: {
    ...mapGetters({ book: 'book/book' })
  },

  beforeDestroy() {
    if (this.isPrecovered()) {      
      this.removePreCover(this.pageID)
    }

    if (this.$route.name !== 'books-id') {
      this.$store.commit('book/clearfy')
    }
  },

  async fetch() {
    await this.fetchBook()
  },

  data() {
    return {
      editedBook: {} as BookSignatures,
      pageID: this.$route.params.id
    }
  },

  methods: {
    async fetchBook() {
      try {
        await this.$store.dispatch('book/fetchBook', this.pageID)
      } catch (error) {
        console.error(error)
      }
    },

    isPrecovered() {
      return this.editedBook.preCoverImage
        || this.$store.getters['book/book'].preCoverImage
    },

    updateBookInstance(payload: FieldPayloadEmit) {
      this.editedBook[payload.key] = payload.value

      if (payload.key === 'coverImage') {
        this.uploadPreCover(payload.value as File)
      }
    },

    async uploadPreCover(file: File) {
      const query = `/api/books/${this.pageID}/precover?folder=covers`
      const formData = new FormData()

      formData.append('preCoverImage', file)

      try {
        const response = await this.$axios.post(query, formData)

        const payload = {
          key: 'preCoverImage',
          value: response.data.preCoverImage
        }

        this.editedBook.preCoverImage = payload.value
        this.$store.commit('book/commitBookField', payload)
      } catch (error) {
        console.error(error)
      }
    },

    async removePreCover(id: string) {
      const query = `/api/books/${id}/precover`

      try {
        await this.$axios.delete(query)
        delete this.editedBook.preCoverImage
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
