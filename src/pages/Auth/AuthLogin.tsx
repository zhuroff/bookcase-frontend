import { observer } from 'mobx-react-lite';
import { BaseSyntheticEvent, useState } from 'react';
import { loginForm } from './authForms';
import { Button } from 'primereact/button';
import { useApi } from '../../hooks/useApi';
import { useLocale } from '../../hooks/useLocale';
import { useAuth } from '../../hooks/useAuth';
import { useAccount } from '../../hooks/useAccount';
import { TAuthPayload } from '../../types/Common';
import formFieldsMap from '../../maps/formFieldsMap';

type LoginFormProps = {
  onError: (error: any) => void
}

export const AuthLogin = observer(({ onError }: LoginFormProps) => {
  const { text } = useLocale()
  const { setAuthStatus } = useAuth()
  const { setAccount } = useAccount()
  const { api: { login } } = useApi()
  const [authData, setAuthData] = useState<TAuthPayload>({ email: '', password: '' })

  const tryAuth = (event: BaseSyntheticEvent) => {
    event.preventDefault()
    login(authData)
      .then((user) => {
        setAuthStatus(true)
        setAccount(user)
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