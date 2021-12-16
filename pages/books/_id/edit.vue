<template lang="pug">
  
  div.book
    BLoading(
      :is-full-page="true"
      v-model="isPreloading"
    )

    BookForm(
      :book="book"
      :isDisabled="false"
      @updateBookInstance="updateBookInstance"
      @pushNewImage="pushNewImage"
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
        @click="saveBookChanges"
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
import { FieldPayloadEmit } from '~/types/Global'
import BookForm from './BookForm.vue'

interface BookSignatures {
  [index: string]: string | number | Blob | boolean
}

export default Vue.extend({
  name: 'SingleBookEdit',

  components: {
    BookForm
  },

  computed: {
    ...mapGetters({ book: 'book/bookState' })
  },

  beforeDestroy() {
    if (this.isPrecovered()) {      
      this.removePreCover(this.pageID)
    }

    if (this.uploadedArticleImages.length) {
      this.removeUnsavedArticleImages()
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
      pageID: this.$route.params.id,

      isPreloading: true,

      uploadedArticleImages: [] as string[]
    }
  },

  methods: {
    async fetchBook() {
      try {
        await this.$store.dispatch('book/fetchBook', this.pageID)
        this.isPreloading = false
      } catch (error) {
        console.error(error)
      }
    },

    isPrecovered() {
      return this.$store.getters['book/bookState'].preCoverImage
    },

    updateBookInstance(payload: FieldPayloadEmit) {
      this.$store.commit('book/storeNewBookContent', payload)

      if (payload.key === 'coverImage') {
        this.uploadPreCover(payload.value as File)
      }
    },

    pushNewImage(url: string) {
      this.uploadedArticleImages.push(url)
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

        this.$store.commit('book/storeNewBookContent', payload)
      } catch (error) {
        console.error(error)
      }
    },

    async removePreCover(id: string) {
      const query = `/api/books/${id}/precover`

      try {
        await this.$axios.delete(query)

        const payload: FieldPayloadEmit = {
          key: 'preCoverImage',
          value: ''
        }
        this.$store.commit('book/storeNewBookContent', payload)
      } catch (error) {
        console.error(error)
      }
    },

    async removeUnsavedArticleImages() {
      const query = `/api/books/summary/images/delete`
      const formData = new FormData()

      formData.append('urls', JSON.stringify(this.uploadedArticleImages))

      try {
        const response = await this.$axios.post(query, formData)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    },

    async saveBookChanges() {
      const storedMutatedBook = this.$store.getters['book/bookState']
      const formData = new FormData()

      formData.append('summary', storedMutatedBook.summary)

      try {
        const response = await this.$axios.patch(`/api/books/${this.pageID}`, formData)

        if (response.status === 200) {
          this.$buefy.snackbar.open({
            message: 'Book data was successfully updated',
            type: 'is-success',
            position: 'is-bottom',
            actionText: 'OK',
            queue: false
          })

          this.uploadedArticleImages = []
        }
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
