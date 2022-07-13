import { BaseSyntheticEvent, createContext, ReactNode, useContext, useRef } from 'react';
import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup';
import { useLocale } from './useLocale';

type ConfirmProviderProps = {
  children: ReactNode
}

const ConfirmContext = createContext({
  ref: {},
  callConfirmation: (e: BaseSyntheticEvent, accept: () => void, reject?: () => void) => { }
})

export const useConfirm = () => useContext(ConfirmContext)

export const ConfirmProvider = ({ children }: ConfirmProviderProps) => {
  const { text } = useLocale()
  const ref = useRef<ConfirmPopup | null>(null)

  const callConfirmation = (event: BaseSyntheticEvent, accept: () => void, reject?: () => void) => {
    const calee = confirmPopup({
      target: event.currentTarget,
      message: text('common.confirmIntention'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => accept(),
      reject: () => reject && reject()
    })

    setTimeout(() => {
      calee.hide()
      setTimeout(() => calee.show(), 1000)
    }, 500)
  }

  return (
    <ConfirmContext.Provider value={{ ref, callConfirmation }}>
      {children}
      <ConfirmPopup ref={ref} />
    </ConfirmContext.Provider>
  )
}
