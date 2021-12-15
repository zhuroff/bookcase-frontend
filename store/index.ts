import { ActionContext, Commit, Dispatch } from 'vuex'

interface GlobalState {
  error: any
}
  
export const state = (): GlobalState => ({
  error: null
})

export const actions = {
  nuxtServerInit ({ commit, dispatch }: ActionContext<Commit, Dispatch>) {
    dispatch('auth/autologin')
  }
}

export const mutations = {
  setError: (state: GlobalState, error: any) => {
    state.error = error
  },

  clearError: (state: GlobalState) => {
    state.error = null
  }
}

export const getters = {
  error: (state: GlobalState): any => state.error
}