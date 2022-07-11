import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { loginForm } from './authForms';
import { Button } from 'primereact/button';
import { Authentication } from '../../store/auth';
import { useApi } from '../../hooks/useApi';
import { useLocale } from '../../hooks/useLocale';
import { useAuth } from '../../hooks/useAuth';
import { useAccount } from '../../hooks/useAccount';
import formFieldsMap from '../../maps/formFieldsMap';

type LoginFormProps = {
  onError: (error: any) => void
}

export const AuthLogin = observer(({ onError }: LoginFormProps) => {
  const { text } = useLocale()
  const { setAuthStatus } = useAuth()
  const { setAccount } = useAccount()
  const { post } = useApi()
  const [authData, setAuthData] = useState({
    email: '',
    password: ''
  })

  const tryAuth = (event: any) => {
    event.preventDefault()
    post<Authentication>('/api/users/login', authData)
      .then((response) => {
        localStorage.setItem('token', response.data.accessToken)
        setAuthStatus(true)
        setAccount(response.data.user)
      })
      .catch((error) => {
        onError(text(error.message))
      })
  }

  return (
    <form
      className={loginForm.class}
      onSubmit={tryAuth}
    >
      <>
        {loginForm.fields.map((field) => {
          // @ts-ignore
          const Component = formFieldsMap[field.entityType]

          return (
            <Component
              key={field.field}
              type={field.type}
              placeholder={text(field.title)}
              onInput={(event: any) => {
                setAuthData({
                  ...authData,
                  [field.field]: event.currentTarget.value
                })
              }}
            />
          )
        })}
        <Button
          label={text(loginForm.submitText)}
        />
      </>
    </form>
  )
})