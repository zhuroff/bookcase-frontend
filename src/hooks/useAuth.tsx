import { ReactNode, createContext, useContext } from 'react'
import authInstance from '../store/auth'

export type AuthProviderProps = {
  value?: typeof authInstance
  children: ReactNode
}

const AuthContext = createContext(authInstance)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ value = authInstance, children }: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
