import { makeAutoObservable } from 'mobx'

export class Account {
  id: string = ''
  email: string = ''
  role: string = ''
  firstName?: string
  lastName?: string

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setAccount(user: Account) {
    this.id = user.id
    this.email = user.email
    this.role = user.role
    this.firstName = user.firstName || ''
    this.lastName = user.lastName || ''
  }
}

export default new Account()
