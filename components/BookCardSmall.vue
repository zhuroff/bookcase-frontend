<template lang="pug">
  
  .card(@click="proceedToBook")
    NuxtLink(
      :to="{ path: `/books/${book._id}` }"
    )
      img(
        :src="baseUrl + (book.coverImage || '/uploads/covers/placeholder.jpg')"
        :alt="book.title"
        class="card__cover"
      )
    
    .card__content
      .card__authors
        NuxtLink(
          v-for="item in book.authors"
          :key="item.author._id"
          :to="{ path: `/authors/${item.author._id}`}"
          class="card__author"
        ) {{ item.author.title }}

      NuxtLink(
        :to="{ path: `/books/${book._id}` }"
        class="card__title"
      ) {{ book.title }}

      .card__tags
        .card__tag(title="Genres")
          span.--marker #
          NuxtLink(
            v-for="item in book.genres"
            :key="item._id"
            :to="{ path: `/genres/${item._id}`}"
            class="--title"
          ) {{ item.title }}

        .card__tag(
          v-if="book.lists.length"
          title="In lists"
        )
          span.--marker &colone;
          NuxtLink(
            v-for="item in book.lists"
            :key="item._id"
            :to="{ path: `/lists/${item._id}`}"
            class="--title"
          ) {{ item.title }}

    .card__actions
      button.card__actions-trigger &vellip;

</template>

<script lang="ts">

import Vue from 'vue'
import nuxtConfig from '~/nuxt.config'

export default Vue.extend({
  name: 'BookCardSmall',

  props: {
    book: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      baseUrl: nuxtConfig.env?.baseUrl
    }
  },

  methods: {
    proceedToBook(event: any) {
      event.preventDefault()

      if (event.target!.tagName !== 'A' && event.target!.tagName !== 'BUTTON') {
        this.$router.push({ path: `/books/${this.book._id}` })
      }
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.card {
  background-color: $middleDark;
  padding: 20px;
  display: grid;
  grid-template-columns: 70px 1fr 0;
  grid-column-gap: 1rem;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  height: 140px;
  overflow: hidden;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    transition: all 0.2s ease;
  }

  &__cover {
    width: 70px;
    height: 100px;
    object-fit: cover;
    border-radius: 3px;
    display: block;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 5px 0 5px 0;
    overflow: hidden;
  }

  &__authors {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: $lightBlue;
  }

  &__author {
    color: $lightBlue;
    font-size: 0.75rem;
    margin-right: 0.5rem;

    &:last-child {
      margin-right: 0;
    }
  }

  &__title {
    color: $darkModeBody;
    font-weight: 400;
    font-size: 0.875rem;
    margin-bottom: 2px;
    line-height: 18px;
    margin-bottom: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__tags {
    margin-top: 10px;
  }

  &__tag {
    font-size: 0.75rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: $lightGray;

    .--marker {
      color: $lightBlue;
      flex: none;
      width: 12px;
      display: inline-block;
      margin-right: 5px;
      text-align: center;
    }

    .--title {
      color: $lightGray;
      margin-right: 0.5rem;

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        color: $darkModeBody;
      }
    }
  }

  &__actions {
    position: absolute;
    top: 0;
    right: 0;

    &-trigger {
      width: 40px;
      height: 45px;
      border: 0;
      background-color: transparent;
      color: $lightGray;
      font-size: 20px;
      font-weight: 600;

      &:hover {
        color: $darkModeBody;
      }
    }
  }
}

</style>
