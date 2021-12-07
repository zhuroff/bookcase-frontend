import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = ({ store, redirect }): void => {
  console.log('well')
  if (!store.getters['auth/isAuthenticated']) {
    return redirect('/auth?message=login')
  }
}

export default authMiddleware
