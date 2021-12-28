<template lang="pug">
  
  div.book
    BLoading(
      :is-full-page="true"
      v-model="isPreloading"
    )

    BookForm(
      v-if="book._id"
      :book="book"
      :isDisabled="false"
      @updateBookInstance="updateBookInstance"
      @updateAuthorRole="updateAuthorRole"
      @updateEditionInfo="updateEditionInfo"
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
        @click="deleteBookConfirmation"
      ) Delete

      BButton(
        v-if="!book.isDraft"
        size="is-small"
        type="is-info"
        @click="setBookPublishStatus(true)"
      ) To draft

      BButton(
        v-else
        size="is-small"
        type="is-info"
        @click="setBookPublishStatus(false)"
      ) Publish

</template>

<script lang="ts">

import Vue from 'vue'
import { mapGetters } from 'vuex'
import { FieldPayloadEmit } from '~/types/Global'
import { BookAuthorRole, EditionInfo } from '~/types/Book'
import BookForm from '~/components/books/BookForm.vue'

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

    updateAuthorRole(payload: BookAuthorRole) {
      this.$store.commit('book/updateAuthorRole', payload)
    },

    updateEditionInfo(payload: EditionInfo) {
      this.$store.commit('book/updateEditionInfo', payload)
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

        const payload: FieldPayloadEmit = {
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

    setBookPublishStatus(isDraft: boolean) {
      this.$store.commit('book/changePublishStatus', isDraft)
      this.saveBookChanges()
    },

    async saveBookChanges() {
      const storedMutatedBook = this.$store.getters['book/bookState']
      console.log(storedMutatedBook)
      // storedMutatedBook.dateModified = new Date().toISOString()
      const formData = new FormData()

      const authors = storedMutatedBook.authors.map((el: any) => ({
        author: el.author._id,
        role: el.role
      }))

      const publishers = storedMutatedBook.publishers.map((el: any) => ({
        publisher: el.publisher._id,
        city: el.city,
        code: el.code
      }))

      const genres = storedMutatedBook.genres.map((el: any) => el._id)

      const series = storedMutatedBook.series?._id || ''

      formData.append('isDraft', storedMutatedBook.isDraft)
      formData.append('summary', storedMutatedBook.summary || '')
      formData.append('contents', storedMutatedBook.contents || '')
      formData.append('description', storedMutatedBook.description || '')
      formData.append('rating', storedMutatedBook.rating || 0)
      formData.append('title', storedMutatedBook.title)
      formData.append('subtitle', storedMutatedBook.subtitle || '')
      formData.append('coverType', storedMutatedBook.coverType || 'unknown')
      formData.append('format', storedMutatedBook.format || 'unavailable')
      formData.append('coverImage', storedMutatedBook.preCoverImage || storedMutatedBook.coverImage || '')
      formData.append('preCoverImage', '')
      formData.append('status', JSON.stringify(storedMutatedBook.status))
      formData.append('authors', JSON.stringify(authors))
      formData.append('publishers', JSON.stringify(publishers))
      formData.append('genres', JSON.stringify(genres))

      if (series.length) {
        formData.append('series', series)
      }

      if (storedMutatedBook.publicationYear) {
        formData.append('publicationYear', storedMutatedBook.publicationYear)
      }

      if (storedMutatedBook.pages) {
        formData.append('pages', storedMutatedBook.pages)
      }

      if (storedMutatedBook.file) {
        formData.append('file', storedMutatedBook.file)
      }

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
    },

    deleteBookConfirmation() {
      this.$buefy.dialog.confirm({
        message: 'Are you serious?',
        onConfirm: () => this.deleteBook()
      })
    },

    async deleteBook() {
      try {
        const response = await this.$axios.delete(`/api/books/${this.$route.params.id}`)

        if (response.status === 200) {
          this.$buefy.snackbar.open({
            message: response.data.message,
            type: 'is-success',
            position: 'is-bottom',
            actionText: 'OK',
            queue: false
          })

          this.$router.push({ path: '/books' })
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
