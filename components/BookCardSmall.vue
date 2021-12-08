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
      .card__title {{ book.title }}
      .card__authors {{ book.authors | categoryTitle }}
      .card__genres Genres: {{ book.genres | categoryTitle }}
      .card__inlist(v-if="book.inList.length") In lists: {{ book.inList | categoryTitle }}

</template>

<script lang="ts">

import Vue from 'vue'
import { CategoryMinimum } from '~/types/Category'

export default Vue.extend({
  name: 'BookCardSmall',

  props: {
    book: {
      type: Object,
      required: true
    }
  },

  filters: {
    categoryTitle(category: CategoryMinimum[] | { author: CategoryMinimum }[]) {
      return category.map((el: any) => (
        el.title || el.author.title
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
  }

  &__title {
    color: $darkModeBody;
    font-weight: 400;
    font-size: 0.875rem;
    margin-bottom: 5px;
  }

  &__authors,
  &__genres,
  &__inlist {
    color: $darkModeBody;
    font-size: 0.75rem;
  }

  &__genres,
  &__inlist {
    opacity: 0.5;
  }
}

</style>
