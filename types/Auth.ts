type AuthFormLabels = 'email' | 'password' | 'passwordConfirm'

type AuthFormFields = {
  [P in AuthFormLabels]?: string
}

export { AuthFormFields }
