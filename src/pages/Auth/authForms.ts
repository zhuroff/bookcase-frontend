const loginForm = {
  class: 'auth__form',
  submitText: 'auth.login',
  fields: [
    {
      type: 'email',
      entityType: 'text',
      title: 'auth.email',
      field: 'email'
    },
    {
      type: 'password',
      entityType: 'text',
      title: 'auth.password',
      field: 'password'
    }
  ]
}

const registerForm = {
  class: 'auth__form',
  submitText: 'auth.register',
  fields: [
    {
      type: 'email',
      entityType: 'text',
      title: 'auth.email',
      field: 'email'
    },
    {
      type: 'password',
      entityType: 'text',
      title: 'auth.password',
      field: 'password'
    },
    {
      type: 'password',
      entityType: 'text',
      title: 'auth.passwordConfirm',
      field: 'passwordConfirm'
    }
  ]
}

export {
  loginForm,
  registerForm
}
