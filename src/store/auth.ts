import { makeAutoObservable } from 'mobx'
import account from './account'

export type Authentication = {
  accessToken: string
  refreshToken: string
  user: typeof account
}

class Auth {
  isAuthenticated: boolean = false

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setAuthStatus(value: boolean) {
    this.isAuthenticated = value
  }
}

export default new Auth()
