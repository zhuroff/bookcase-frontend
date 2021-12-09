<template lang="pug">
  
  form.book__form
    aside.book__form-aside
      CoverUploader(
        propKey="coverImage"
        :image="book.coverImage"
        :isDisabled="isDisabled"
        @updateCover="updateBookInstance"
      )

      BookReadingStatus(
        v-if="book.status"
        :status="book.status"
        :isDisabled="isDisabled"
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
        v-if="book.subtitle"
        placeholder="Book subtitle"
        classname="book__subtitle"
        propKey="subtitle"
        :initHeight="30"
        :content="book.subtitle"
        :isDisabled="isDisabled"
        @typeText="updateBookInstance"
      )

      .repeaters
        AppRepeater(
          title="Authors"
          componentKey="authors"
          :items="book.authors"
          :isDisabled="isDisabled"
        )

        AppRepeater(
          title="Publishers"
          componentKey="publishers"
          :items="book.publishers"
          :isDisabled="isDisabled"
      )

</template>

<script lang="ts">

import Vue from 'vue'
import AppTextarea from '~/components/AppTextarea.vue'
import CoverUploader from '~/components/CoverUploader.vue'
import BookReadingStatus from '~/components/BookReadingStatus.vue'
import AppRepeater from '~/components/Repeater/AppRepeater.vue'

interface FieldPayloadEmit {
  key: string
  value: string | number | boolean
}

export default Vue.extend({
  name: 'BookForm',

  components: {
    AppTextarea,
    CoverUploader,
    BookReadingStatus,
    AppRepeater
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

  methods: {
    updateBookInstance(payload: FieldPayloadEmit) {
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
      border-bottom: 1px solid $lightGray;
    }
  }

  textarea {
    resize: none;
  }

  &__form {
    display: grid;
    grid-template-columns: 300px 1fr;

    &-aside {
      padding-right: 3rem;
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

.repeaters {
  display: grid;
  margin: 0 -0.5rem;
  grid-template-columns: auto auto auto auto;
}

</style>

