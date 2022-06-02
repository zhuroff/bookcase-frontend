<template lang="pug">
  BTable(
    v-if="books.length"
    :data="books"
    :paginated="true"
    :per-page="perPage"
    :current-page.sync="currentPage"
    class="paper-books-table"
  )
    BTableColumn(v-slot="props")
      NuxtLink(
        :to="{ path: `/books/${props.row._id}` }"
      )
        img(
          :src="baseUrl + (props.row.coverImage || '/uploads/covers/placeholder.jpg')"
          class="cover"
        )

    BTableColumn(v-slot="props")
      NuxtLink(
        :to="{ path: `/books/${props.row._id}` }"
      )
        div(class="table-heading")
          strong {{ props.row.title }}
          span(v-if="props.row.subtitle") : {{ props.row.subtitle }}
          time , {{ props.row.publicationYear }}
        ul(class="table-authors")
          li(
            v-for="item in props.row.authors"
            :key="item.author._id"
          ) {{ item.author.title }}
</template>

<script lang="ts">
import Vue from 'vue'
import nuxtConfig from '~/nuxt.config'

export default Vue.extend({
  name: 'PaperBooks',

  async fetch() {
    await this.fetchPaperBooks()
  },

  data() {
    return {
      baseUrl: nuxtConfig.env?.baseUrl,
      perPage: 50,
      currentPage: 1,
      books: []
    }
  },

  methods: {
    async fetchPaperBooks() {
      try {
        const response = await this.$axios.post('/api/books/paper', {
          page: 1,
          sort: { dateCreated: -1 },
          limit: 1000,
          isDraft: false
        })

        this.books = response.data.docs.filter((book: any) => (
          !Boolean(book.file)
        ))

        console.log(this.books[0])
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

<style lang="scss">
.paper-books-table {

  .cover {
    width: 30px;
    height: auto;
  }

  .table-heading {
    font-size: 18px;
    color: #fff;
    margin-bottom: 0;
  }

  .table-authors {
    color: #cecece;
  }

  strong {
    color: #fff;
    font-weight: 600;
  }
}
</style>
