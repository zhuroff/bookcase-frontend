import axios, { AxiosInstance } from 'axios'
import { ReactNode, createContext, useContext, useState, SetStateAction, Dispatch } from 'react'
import { TAuthPayload, TEntityError, TPageConfig, TPaginatorResponse } from '../types/Common'
import { TPaginatedListResponse } from '../types/Common'
import { Account } from '../store/account'
import { Authentication } from '../store/auth'
import { useLocale } from './useLocale'
import { useToast } from './useToast'

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_HOST
}) as AxiosInstance & { remove: AxiosInstance['delete'] }

axiosInstance.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

axiosInstance.interceptors.response.use((config) => {
  return config
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        return window.location.href = '/'
      default:
        throw error.response.data
    }
  } else {
    console.log('Unhadler error')
  }
})

export type ApiProviderProps = {
  value?: typeof axiosInstance
  children: ReactNode
}

interface Api {
  createEntity: <T, U>(path: string, payload: U) => Promise<T>
  deleteEntity: (path: string) => Promise<void>
  saveEntity: <T, U>(path: string, payload: U) => Promise<T | void>
  getEntity: <T>(path: string) => Promise<T>
  getConfiguredEntity: <T, >(path: string, config: TPageConfig | null, slug: string, setter: Dispatch<Partial<T>>) => Promise<void>
  getPaginatedList: <T>(path: string, config: Partial<TPageConfig> | null, setter: Dispatch<SetStateAction<T[]>>) => Promise<void>
  getSearchResults: <T>(query: string, setter: Dispatch<SetStateAction<T | null>>, collection?: string) => void,
  uploadFile: <T, >(path: string, key: string, file: File) => Promise<T | void>
  login: (payload: TAuthPayload) => Promise<Account>
}

const ApiContext = createContext<{
  api: Api
  pagination: TPaginatorResponse | null
}>({
  api: {} as Api,
  pagination: null
})

export const useApi = () => useContext(ApiContext)

export const ApiProvider = ({ value = axiosInstance, children }: ApiProviderProps) => {
  const toast = useToast()
  const { text } = useLocale()
  const [pagination, setPagination] = useState<TPaginatorResponse | null>(null)


  const api: Api = {
    createEntity: <T, U>(path: string, payload: U) => {
      return value.post<T>(`/api/${path}`, payload)
        .then((response) => response.data)
    },

    deleteEntity: (path: string) => {
      return value.delete(path)
        .then(() => {
          toast.current?.show({
            severity: 'success',
            summary: text('success'),
            detail: text('common.successDeleted'),
            life: 5000
          })
        })
        .catch((error) => console.error(error))
    },

    saveEntity: <T, U>(path: string, payload: U) => {
      return value.patch<T>(`/api/${path}`, payload)
        .then((response) => response.data)
        .catch((error: TEntityError[]) => {
          error.forEach((err) => {
            toast.current?.show({
              severity: 'error',
              summary: text('error'),
              detail: text(err.msg),
              life: 5000
            })
          })
        })
    },

    getEntity: <T,>(path: string) => {
      return value.get<T>(`/api/${path}`)
        .then((response) => response.data)
    },

    getConfiguredEntity: <T,>(
      path: string,
      config: TPageConfig | null,
      slug: string,
      setter: Dispatch<Partial<T>>
    ) => {
      return value.post<T>(`/api/${path}`, { ...config, slug })
        .then((response) => setter(response.data))
        .catch((error) => console.error(error))
    },

    getPaginatedList: <T,>(
      path: string,
      config: Partial<TPageConfig> | null,
      setter: Dispatch<SetStateAction<T[]>>
    ) => {
      return value.post<TPaginatedListResponse<T>>(`/api/${path}`, config)
        .then((response) => {
          setter(response.data.docs)
          setPagination(response.data.pagination)
        })
    },

    getSearchResults: <T,>(
      query: string,
      setter: Dispatch<SetStateAction<T | null>>,
      collection?: string
    ) => {
      value.post<T>('/api/search', { query, collection })
        .then((response) => setter(response.data))
        .catch((error) => {
          toast.current?.show({
            severity: 'error',
            summary: text('error'),
            detail: text(error.message),
            life: 3000
          })
        })
    },

    uploadFile: <T,>(path: string, key: string, file: File) => {
      const formData = new FormData()
      formData.append(key, file)
      return value.post<T>(`/api/${path}`, formData)
        .then((response) => {
          toast.current?.show({
            severity: 'success',
            summary: text('success'),
            detail: text('book.successSaving'),
            life: 5000
          })
          return response.data
        })
        .catch((error) => console.error(error))
    },

    login: (payload: TAuthPayload) => {
      return value.post<Authentication>('/api/users/login', payload)
        .then((response) => {
          localStorage.setItem('token', response.data.accessToken)
          return response.data.user
        })
    }
  }

  return (
    <ApiContext.Provider value={{ api, pagination }}>
      {children}
    </ApiContext.Provider>
  )
}
