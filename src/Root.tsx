import { useEffect, useLayoutEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocale } from './hooks/useLocale';
import { LocaleCodes } from './store/locales';
import { useAuth } from './hooks/useAuth';
import { useApi } from './hooks/useApi';
import { Preloader } from './components/Preloader/Preloader';
import { LayoutAuth } from './layouts/LayoutAuth';
import { LayoutAdmin } from './layouts/LayoutAdmin';
import { AuthRoutes } from './routes/AuthRoutes';
import { AdminRoutes } from './routes/AdminRoutes';
import { Authentication } from './store/auth';
import { useAccount } from './hooks/useAccount';
import { useToast } from './hooks/useToast';

export const Root = observer(() => {
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const { setLocale, text } = useLocale()
  const { isAuthenticated, setAuthStatus } = useAuth()
  const { setAccount } = useAccount()
  const { get } = useApi()
  const toast = useToast()

  const checkAuthentication = () => {
    if (localStorage.getItem('token')) {
      get<Authentication>('api/users/refresh')
        .then((response) => {
          localStorage.setItem('token', response.data.accessToken)
          setAuthStatus(true)
          setAccount(response.data.user)
          setIsAuthChecked(true)
        })
        .catch((error) => {
          localStorage.removeItem('token')
          setAuthStatus(false)
          setIsAuthChecked(true)

          toast.current?.show({
            severity: 'error',
            summary: text('error'),
            detail: text(error.message),
            life: 5000
          })
        })
    } else {
      setAuthStatus(false)
      setIsAuthChecked(true)
    }
  }

  useEffect(() => {
    checkAuthentication()
  })

  useLayoutEffect(() => {
    setLocale(localStorage.getItem('locale') as LocaleCodes || 'ru')
  })

  return (
    <>
      {
        !isAuthChecked
          ? <Preloader />
          : isAuthenticated
            ? <LayoutAdmin><AdminRoutes /></LayoutAdmin>
            : <LayoutAuth><AuthRoutes /></LayoutAuth>
      }
    </>
  )
})
