import { Plugin, Context } from '@nuxt/types'
import { AxiosRequestConfig, AxiosError } from 'axios'

const accessor: Plugin = ({ $axios, redirect, store }: Context) => {
  $axios.interceptors.request.use((request: AxiosRequestConfig): AxiosRequestConfig => {
    if (store.getters['auth/isAuthenticated'] && !request.headers.common.Authorization) {
      const token: string = store.getters['auth/sessionToken']
      request.headers.common.Authorization = `Bearer ${token}`
    }

    return request
  })

  $axios.onError((error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        redirect('/login?message=session')
        store.dispatch('auth/logout')
      }

      if (error.response.status === 500) {
        console.error('Server 500 error')
      }
    }
  })
}

export default accessor
