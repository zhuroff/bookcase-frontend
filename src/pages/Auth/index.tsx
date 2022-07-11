import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useLocale } from '../../hooks/useLocale';
import { useToast } from '../../hooks/useToast';
import { AuthLogin } from './AuthLogin';
// import { AuthRegister } from './AuthRegister';

export const Auth = observer(() => {
  const [loginError, setLoginError] = useState('')
  // const [registerError, setRegisterError] = useState('')
  const { text } = useLocale()
  const toast = useToast()

  useEffect(() => {
    loginError && toast.current?.show({
      severity: 'error',
      summary: text('error'),
      detail: loginError,
      life: 5000
    })
  }, [loginError])

  // useEffect(() => {
  //   registerError && toast.current?.show({
  //     severity: 'error',
  //     summary: text('error'),
  //     detail: registerError,
  //     life: 5000
  //   })
  // }, [registerError])

  return (
    <div className="container">
      <AuthLogin
        onError={(message: string) => setLoginError(message)}
      />

      {/* <AuthRegister
        onError={(message: string) => setRegisterError(message)}
      /> */}
    </div>
  )
})
