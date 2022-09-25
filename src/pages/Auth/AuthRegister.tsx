import { observer } from 'mobx-react-lite';
import { BaseSyntheticEvent, useState } from 'react';
// import { useApi } from '../../hooks/useApi';
import { useLocale } from '../../hooks/useLocale';
import { registerForm } from './authForms';
import { Button } from 'primereact/button';
import formFieldsMap from '../../maps/formFieldsMap';

type RegisterFormProps = {
  onError: (error: any) => void
}

export const AuthRegister = observer(({ onError }: RegisterFormProps) => {
  const { text } = useLocale()
  // const { post } = useApi()
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const tryRegister = (event: BaseSyntheticEvent) => {
    event.preventDefault()
    // post('/api/users/registration', registerData)
    //   .then((response) => console.log(response))
    //   .catch((error) => {
    //     onError(text(error.message))
    //   })
  }

  return (
    <form
      className={registerForm.class}
      onSubmit={tryRegister}
    >
      <>
        {registerForm.fields.map((field) => {
          // @ts-ignore
          const Component = formFieldsMap[field.entityType]

          return (
            <Component
              key={field.field}
              type={field.type}
              placeholder={text(field.title)}
              onInput={(event: any) => {
                setRegisterData({
                  ...registerData,
                  [field.field]: event.currentTarget.value
                })
              }}
            />
          )
        })}
      </>
      <Button
        label={text(registerForm.submitText)}
      />
    </form>
  )
})
