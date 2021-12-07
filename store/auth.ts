import { ActionContext, Commit, Dispatch } from 'vuex'
import Cookie from 'cookie'
import Cookies from 'js-cookie'
import { Token } from '~/types/Token'
import { AuthFormFields } from '~/types/Auth'
import isJwtValid from '~/helpers/jwt-validation'

interface IAuthState {
  token: Token
}

export const state = (): IAuthState => ({
  token: null
})

export const mutations = {
  commitToken: (state: IAuthState, token: string) => {
    state.token = token
  },

  clearToken: (state: IAuthState) => {
    state.token = null
  }
}

export const actions = {
  async login ({ commit, dispatch }: ActionContext<Commit, Dispatch>, payload: AuthFormFields) {
    try {
      const response = await (this as any).$axios.post('/api/auth/login', payload)
      dispatch('setToken', response.data.token)
    } catch (error) {
      console.log(error)
      // commit('setError', error, { root: true })
    }
  },

  logout ({ commit }: ActionContext<Commit, Dispatch>) {
    (this as any).$axios.setToken(false)
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
    (this as any).$axios.setToken(token, 'Bearer')
    commit('commitToken', token)
    Cookies.set('jwt-token', token)
  }
}

export const getters = {
  isAuthenticated: (state: IAuthState): Token => state.token,
  sessionToken: (state: IAuthState): string | null => state.token
}
