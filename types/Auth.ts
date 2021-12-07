type AuthFormLabels = 'email' | 'password' | 'passwordConfirm'

type AuthFormFields = {
  [P in AuthFormLabels]?: string
}

type AuthFormPayload= {
  type: AuthFormLabels,
  value: string,
  label: string
}

export {
  AuthFormFields,
  AuthFormLabels,
  AuthFormPayload
}
