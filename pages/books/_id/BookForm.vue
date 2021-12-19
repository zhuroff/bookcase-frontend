<template lang="pug">
  
  form.book__form
    aside.book__form-aside
      CoverUploader(
        propKey="coverImage"
        :image="coverImage"
        :isDisabled="isDisabled"
        @updateCover="updateBookInstance"
      )

      BookReadingStatus(
        v-if="book.status"
        :status="book.status"
        :rating="book.rating"
        :isDisabled="isDisabled"
        @setBookStatus="setBookStatus"
        @setBookRating="setBookRating"
      )

    .book__form-main
      AppTextarea(
        placeholder="Book title"
        classname="book__title"
        propKey="title"
        :initHeight="40"
        :content="book.title"
        :isDisabled="isDisabled"
        @typeText="updateBookInstance"
      )

      AppTextarea(
        v-if="book.subtitle || !isDisabled"
        placeholder="Book subtitle"
        classname="book__subtitle"
        propKey="subtitle"
        :initHeight="30"
        :content="book.subtitle"
        :isDisabled="isDisabled"
        @typeText="updateBookInstance"
      )

      AppRepeater(
        title="Authors"
        componentKey="authors"
        :items="book.authors || []"
        :isDisabled="isDisabled"
        @repeaterCardClick="repeaterCardClick"
        @callRepeaterModal="callRepeaterModal"
        @deleteCard="deleteCard"
      )

      AppRepeater(
        title="Publishers"
        componentKey="publishers"
        :items="book.publishers || []"
        :isDisabled="isDisabled"
        @repeaterCardClick="repeaterCardClick"
        @callRepeaterModal="callRepeaterModal"
        @deleteCard="deleteCard"
      )

      AppRepeater(
        title="Genres"
        componentKey="genres"
        :items="book.genres || []"
        :isDisabled="isDisabled"
        @repeaterCardClick="repeaterCardClick"
        @callRepeaterModal="callRepeaterModal"
        @deleteCard="deleteCard"
      )

      AppRepeater(
        title="Series"
        componentKey="series"
        :items="book.series ? [book.series] : []"
        :isDisabled="isDisabled"
        @repeaterCardClick="repeaterCardClick"
        @callRepeaterModal="callRepeaterModal"
        @deleteCard="deleteCard"
      )

      AppRepeater(
        title="In lists"
        componentKey="lists"
        :items="book.lists || []"
        :isDisabled="isDisabled"
        @repeaterCardClick="repeaterCardClick"
        @callRepeaterModal="callRepeaterModal"
        @deleteCard="deleteCard"
      )

      BookOutputData(
        :book="book"
        :isDisabled="isDisabled"
      )

      AppEditor(
        v-if="book.description || !isDisabled"
        heading="Annotation"
        fieldKey="description"
        :content="book.description"
        :tools="annotationTools"
        :isDisabled="isDisabled"
        @updateEditorContent="updateEditorContent"
      )

      AppEditor(
        v-if="book.contents || !isDisabled"
        heading="Table of contents"
        fieldKey="contents"
        :content="book.contents"
        :tools="contentsTools"
        :isDisabled="isDisabled"
        @updateEditorContent="updateEditorContent"
      )

      AppEditor(
        v-if="book.summary || !isDisabled"
        heading="Summary"
        fieldKey="summary"
        classname="summary"
        :content="book.summary"
        :tools="summaryTools"
        :isDisabled="isDisabled"
        @updateEditorContent="updateEditorContent"
        @pushNewImage="pushNewImage"
      )

    BModal(
      v-model="isModalActive"
      @close="closeRepeaterModal"
    )
      AppRepeaterModal(
        :propKey="repeaterModalKey"
        :data="repeaterData.data"
        :pagination="repeaterData.pagination || {}"
        @selectCategoryItem="selectCategoryItem"
        @switchPagination="switchPagination"
      )

</template>

<script lang="ts">

import Vue from 'vue'
import { FieldPayloadEmit } from '~/types/Global'
import { BookStatus } from '~/types/Book'
import AppTextarea from '~/components/AppTextarea.vue'
import CoverUploader from '~/components/CoverUploader.vue'
import BookReadingStatus from '~/components/BookReadingStatus.vue'
import AppRepeater from '~/components/Repeater/AppRepeater.vue'
import BookOutputData from '~/components/BookOutputData.vue'
import AppEditor from '~/components/Editor/AppEditor.vue'
import AppRepeaterModal from '~/components/Repeater/AppRepeaterModal.vue'

interface RepeaterFetchedData {
  dateCreated: string
  isDraft: boolean
  title: string
  _id: string
}

interface RepeaterFetchedPagination {
  totalPages: number
  currentPage: number
}

interface RepeaterFetchedConfig {
  data: RepeaterFetchedData[]
  pagination: RepeaterFetchedPagination | null
}

export default Vue.extend({
  name: 'BookForm',

  components: {
    AppTextarea,
    CoverUploader,
    BookReadingStatus,
    AppRepeater,
    BookOutputData,
    AppEditor,
    AppRepeaterModal
  },

  props: {
    book: {
      type: Object,
      required: true
    },

    isDisabled: {
      type: Boolean,
      required: true
    }  
  },

  computed: {
    coverImage() {
      if (this.$route.name === 'books-id' || !this.book.preCoverImage) {
        return this.book.coverImage || '/uploads/covers/placeholder.jpg'
      }

      return this.book.preCoverImage
        || this.book.coverImage
        || '/uploads/covers/placeholder.jpg'
    }
  },

  data() {
    return {
      annotationTools: 'AnnotationTools',

      contentsTools: 'ContentsTools',

      summaryTools: 'SummaryTools',

      isModalActive: false,

      repeaterModalKey: '',

      repeaterConfig: {
        page: 1,
        sort: { title: 1 },
        limit: 20,
        isDraft: false
      },

      repeaterData: {
        data: [],
        pagination: null
      } as RepeaterFetchedConfig
    }
  },

  methods: {
    updateBookInstance(payload: FieldPayloadEmit) {
      this.$emit('updateBookInstance', payload)
    },

    repeaterCardClick(payload: FieldPayloadEmit) {
      this.callRepeaterModal(payload.key)
    },

    callRepeaterModal(key: string) {
      this.isModalActive = true
      this.repeaterModalKey = key
      this.fetchModalList(key)
    },

    closeRepeaterModal() {
      this.isModalActive = false
      this.repeaterData.data = []
      this.repeaterData.pagination = null
      this.repeaterConfig.page = 1
    },

    selectCategoryItem(payload: FieldPayloadEmit) {
      if (payload.key === 'lists') {
        return this.fetchSubLists(payload.value._id)
      }

      this.$store.commit('book/updateCategories', payload)
      this.closeRepeaterModal()
    },

    switchPagination(payload: FieldPayloadEmit) {
      this.repeaterConfig.page = payload.value
      this.fetchModalList(payload.key)
    },

    async fetchSubLists(id: string) {
      try {
        const response = await this.$axios.get(`/api/lists/${id}/sub`)
        console.log(response.data.lists)
      } catch (error) {
        console.error(error)
      }
    },

    async fetchModalList(key: string) {
      try {
        const response = await this.$axios.post(`/api/${key}`, this.repeaterConfig)
        this.setModalData(response.data.docs)
        this.setModalPagination(response.data)
      } catch (error) {
        console.error(error)
      }
    },

    setModalData(data: RepeaterFetchedData[]) {
      this.repeaterData.data = data
    },

    setModalPagination(data: RepeaterFetchedPagination) {
      this.repeaterData.pagination = {
        totalPages: data.totalPages,
        currentPage: this.repeaterConfig.page
      }
    },

    deleteCard(payload: FieldPayloadEmit) {
      this.$store.commit('book/deleteCategoryItem', payload)
    },

    updateEditorContent(payload: FieldPayloadEmit) {
      this.$store.commit('book/storeNewBookContent', payload)
    },

    pushNewImage(url: string) {
      this.$emit('pushNewImage', url)
    },

    setBookStatus(status: BookStatus) {
      const payload: FieldPayloadEmit = {
        key: 'status',
        value: status
      }

      this.$emit('updateBookInstance', payload)
    },

    setBookRating(rating: number) {
      const payload: FieldPayloadEmit = {
        key: 'rating',
        value: rating
      }

      this.$emit('updateBookInstance', payload)
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.book {

  .input,
  .textrow {
    color: $darkModeBody;
    background-color: transparent;
    width: 100%;
    display: block;
    border-color: transparent;
    outline: none;

    &:not([disabled]) {
      border-bottom: 1px solid $lightDark;
    }
  }

  textarea {
    resize: none;
  }

  &__form {
    display: grid;
    grid-template-columns: 300px 1fr;
    margin-bottom: 3rem;

    &-aside {
      padding-right: 3rem;
    }

    & > .modal {
      top: $headerHeight;
      bottom: $headerHeight;
      left: $sidebarWidth;
      padding: 2rem;
    }
  }

  &__title {
    font-size: 1.5rem;
    line-height: 2rem;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  &__subtitle {
    font-size: 1rem;
    padding-bottom: 0.25rem;
    line-height: 1.25rem;
    margin-bottom: 1rem;
  }
}

</style>

