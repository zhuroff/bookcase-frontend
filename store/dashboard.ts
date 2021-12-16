import { ActionContext, Commit, Dispatch } from 'vuex'
import { BasicBook } from '~/types/Book'

interface DashboardState {
  readingBooks: BasicBook[]
  readBooks: BasicBook[],
  readYear: number
}

export const state = (): DashboardState => ({
  readingBooks: [] as BasicBook[],
  readBooks: [] as BasicBook[],
  readYear: new Date().getFullYear()
})

export const mutations = {
  commitReadingBooks: (state: DashboardState, data: BasicBook[]) => {
    state.readingBooks = data
  },

  commitReadBooks: (state: DashboardState, data: BasicBook[]) => {
    state.readBooks = data
  },

  updateReadingYear: (state: DashboardState, year: number) => {
    state.readYear = year
  }
}

export const actions = {
  async fetchReadingBooks({ commit, dispatch }: ActionContext<Commit, Dispatch>) {
    try {
      const response = await (this as any).$axios.get('/api/dashboard/reading-books')
      commit('commitReadingBooks', response.data)
    } catch (error) {
      console.error(error)
    }
  },

  async fetchReadBooks({ commit, dispatch }: ActionContext<Commit, Dispatch>, year: number) {
    try {
      const response = await (this as any).$axios.post('/api/dashboard/read-books', { year: year })
      commit('commitReadBooks', response.data)
    } catch (error) {
      console.error(error)
    }
  }
}

export const getters = {
  readingBooksState: (state: DashboardState) => state.readingBooks,
  readBooksState: (state: DashboardState) => state.readBooks,
  readYearState: (state: DashboardState) => state.readYear,
}
