<template lang="pug">
  
  NuxtLink(
    :to="{ path: `/books/${book._id}` }"
    class="card"
  )
    img(
      :src="'/uploads' + book.coverImage"
      :alt="book.title"
      class="card__cover"
    )
    
    .card__content
      .title.is-6 {{ book.title }}
      .card__authors {{ book.relatedAuthors | categoryTitle }}

</template>

<script lang="ts">

import Vue from 'vue'
import CategoryMinimum from '~/types/Category'

export default Vue.extend({
  name: 'BookCardSmall',

  props: {
    book: {
      type: Object,
      required: true
    }
  },

  filters: {
    categoryTitle(category: CategoryMinimum[]) {
      return category.map((el: CategoryMinimum) => (
        el.title
      )).join('. ')
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.card {
  background-color: $middleDark;
  padding: 20px;
  display: flex;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    filter: sepia(1);
    transition: all 0.2s ease;
  }

  &__cover {
    width: 70px;
    height: 100px;
    flex: none;
    object-fit: cover;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  &__content {
    padding-left: 15px;

    .title {
      color: $darkModeBody;
      font-weight: 400;
      font-size: 0.875rem;
      margin-bottom: 5px;
    }
  }

  &__authors {
    color: $darkModeBody;
    font-size: 0.75rem;
  }
}

</style>
