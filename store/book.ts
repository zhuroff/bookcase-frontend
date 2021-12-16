import { ActionContext, Commit, Dispatch } from 'vuex'
import { EntireBook, BookState, BookStatus } from '~/types/Book'
import { FieldPayloadEmit } from '~/types/Global'
import nuxtConfig from '~/nuxt.config'

// const BookInstance: EntireBook = {
//   _id: '',
//   title: '',
//   coverImage: '',
//   pages: 0,
//   authors: [],
//   genres: [],
//   lists: [],
//   summary: '',
//   contents: '',
//   preCoverImage: null,
//   coverType: '',
//   dateCreated: '',
//   description: '',
//   dateModified: '',
//   file: '',
//   format: '',
//   isDraft: false,
//   links: [],
//   publicationYear: 0,
//   publishers: [],
//   rating: 0,
//   series: null,
//   status: { start: null, finish: null },
//   subtitle: ''
// }

const summaryUrlClearfy = (summary: string): string => {
  if (!summary.includes('article_covers')) {
    return summary
  }

  const clearfy = summary
    .replace(/http:\/\/localhost\//g, '')
    .replace(/article_covers\//g, '/articles/')
    .replace(/\/articles\//g, nuxtConfig.env.BASE_URL + '/uploads/articles/')

  return clearfy
}

export const state = (): BookState => ({
  book: {
    status: { start: null, finish: null }
  } as EntireBook
})

export const mutations = {
  commitBook: (state: BookState, data: EntireBook) => {
    if (data.summary) {
      data.summary = summaryUrlClearfy(data.summary)
    }

    state.book = data
  },

  storeNewBookContent: (state: BookState, data: FieldPayloadEmit) => {
    (state.book as any)[data.key] = data.value
  },

  updateCategories: (state: BookState, payload: FieldPayloadEmit) => {
    switch(payload.key) {
      case 'authors':
        state.book.authors.push({
          author: payload.value,
          role: ''
        })
        break
      case 'publishers':
        state.book.publishers.push({
          city: '',
          code: '',
          publisher: payload.value
        })
        break
      case 'series':
        state.book.series = payload.value
        break
      default:
        (state.book as any)[payload.key].push(payload.value)
    }
  },

  clearfy: (state: BookState) => {
    state.book = {} as EntireBook
  }
}

export const actions = {
  async fetchBook({ commit, dispatch }: ActionContext<Commit, Dispatch>, id: string) {
    try {
      const response = await (this as any).$axios.get(`/api/books/${id}`)
      commit('commitBook', response.data)
    } catch (error) {
      console.error(error)
    }
  }
}

export const getters = {
  bookState: (state: BookState) => state.book
}
