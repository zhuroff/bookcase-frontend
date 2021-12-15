import { ActionContext, Commit, Dispatch } from 'vuex'
import { BasicBook } from '~/types/Book'

interface DashboardState {
  readingBooks: BasicBook[]
}

export const state = (): DashboardState => ({
  readingBooks: [] as BasicBook[]
})

export const mutations = {
  commitReadingBooks: (state: DashboardState, data: BasicBook[]) => {
    state.readingBooks = data
  }
}

export const actions = {
  async fetchReadingBook({ commit, dispatch }: ActionContext<Commit, Dispatch>) {
    try {
      const response = await (this as any).$axios.get('/api/dashboard/reading-books')
      commit('commitReadingBooks', response.data)
    } catch (error) {
      console.error(error)
    }
  }
}

export const getters = {
  readingBooksState: (state: DashboardState) => state.readingBooks
}
