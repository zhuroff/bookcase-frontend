import { ReactNode, createContext, useContext } from 'react'
import accountInstance from '../store/account'

export type AccountProviderProps = {
  value?: typeof accountInstance
  children: ReactNode
}

const AccountContext = createContext(accountInstance)

export const useAccount = () => useContext(AccountContext)

export const AccountProvider = ({ value = accountInstance, children }: AccountProviderProps) => {
  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  )
}
