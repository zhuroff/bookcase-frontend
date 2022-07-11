import { ReactNode, createContext, useContext } from 'react'
import axios from 'axios'

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_HOST
})

api.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

api.interceptors.response.use((config) => {
  return config
}, (error) => {
  if (error.response) {
    throw error.response.data
    // throw new Error(errorMessages[error.response.status])
  } else {
    console.log('Unhadler error')
  }
})

export type ApiProviderProps = {
  value?: typeof api
  children: ReactNode
}

const ApiContext = createContext(api)

export const useApi = () => useContext(ApiContext)

export const ApiProvider = ({ value = api, children }: ApiProviderProps) => {
  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  )
}
