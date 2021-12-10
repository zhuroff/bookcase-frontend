import { ActionContext, Commit, Dispatch } from 'vuex'
import { EntireBook, BookState } from '~/types/Book'

export const state = (): BookState => ({
  book: {} as EntireBook
})

export const mutations = {
  commitBook: (state: BookState, data: EntireBook) => {
    state.book = data
  },

  commitBookField: (state: BookState, data: { key: string, value: any }) => {
    (state as any).book[data.key] = data.value
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
  book: (state: BookState) => state.book
}
