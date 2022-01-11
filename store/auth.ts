import { ActionContext, Commit, Dispatch } from 'vuex'
import { $axios } from '~/utils/api'
import Cookie from 'cookie'
import Cookies from 'js-cookie'
import { Token } from '~/types/Token'
import { AuthFormFields } from '~/types/Auth'
import isJwtValid from '~/helpers/jwt-validation'

interface AuthState {
  token: Token
}

export const state = (): AuthState => ({
  token: null
})

export const mutations = {
  commitToken: (state: AuthState, token: string) => {
    state.token = token
  },

  clearToken: (state: AuthState) => {
    state.token = null
  }
}

export const actions = {
  async create({ commit, dispatch }: ActionContext<Commit, Dispatch>, payload: AuthFormFields) {
    try {
      const response = await $axios.post('/api/users/create', payload)
      return response
    } catch (error) {
      console.log(error)
    }
  },

  async login ({ commit, dispatch }: ActionContext<Commit, Dispatch>, payload: AuthFormFields) {
    try {
      const response = await $axios.post('/api/users/login', payload)
      dispatch('setToken', response.data.token)
      return response
    } catch (error) {
      console.log(error)
      // commit('setError', error, { root: true })
    }
  },

  logout ({ commit }: ActionContext<Commit, Dispatch>) {
    $axios.setToken(false)
    commit('clearToken')
    Cookies.remove('jwt-token')
  },

  autologin ({ commit, dispatch }: ActionContext<Commit, Dispatch>) {
    const cookieStr: string = process.client
      ? document.cookie
      : (this as any).app.context.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']

    isJwtValid(token) ? dispatch('setToken', token) : dispatch('logout')
  },

  setToken ({ commit }: ActionContext<Commit, Dispatch>, token: string) {
    $axios.setToken(token, 'Bearer')
    commit('commitToken', token)
    Cookies.set('jwt-token', token)
  }
}

export const getters = {
  isAuthenticated: (state: AuthState): Token => state.token,
  sessionToken: (state: AuthState): string | null => state.token
}
