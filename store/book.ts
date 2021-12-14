import { ActionContext, Commit, Dispatch } from 'vuex'
import { EntireBook, BookState } from '~/types/Book'
import { FieldPayloadEmit } from '~/types/Global'
import nuxtConfig from '~/nuxt.config'

const summaryUrlClearfy = (summary: string | null): string => {
  if (!summary) return ''

  const clearfy = summary
    .replace(/http:\/\/localhost\//g, '')
    .replace(/article_covers\//g, '/articles/')
    .replace(/\/articles\//g, nuxtConfig.env.BASE_URL + '/uploads/articles/')

  return clearfy
}

export const state = (): BookState => ({
  book: {} as EntireBook,

  editedBook: {} as EntireBook
})

export const mutations = {
  commitBook: (state: BookState, data: EntireBook) => {
    if (data.summary) {
      data.summary = summaryUrlClearfy(data.summary)
    }

    state.book = data
    state.editedBook = JSON.parse(JSON.stringify(data))
  },

  storeNewBookContent: (state: BookState, data: FieldPayloadEmit) => {
    (state.editedBook as any)[data.key] = data.value
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
  book: (state: BookState) => state.book,

  editedBook: (state: BookState) => state.editedBook
}
