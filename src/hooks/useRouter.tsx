import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { TRoute } from '../types/Common'
import { useLocale } from './useLocale'
import { Dashboard } from '../pages'
import { Books } from '../pages/Books'
import { Book } from '../pages/Books/_id'
import { Authors } from '../pages/Authors'
import { Author } from '../pages/Authors/_id'
// import { Genres } from '../pages/Genres'

export const useRouter = () => {
  const { currentLocale, text } = useLocale()
  const routeList: TRoute[] = [
    {
      path: '/',
      element: <Dashboard />,
      title: text('routes.dashboard')
    },
    {
      path: '/login',
      element: <Navigate to="/" />
    },
    {
      path: '/books',
      element: <Books />,
      title: text('routes.books')
    },
    {
      path: '/books/:id',
      element: <Book />
    },
    {
      path: '/books/:id/:edit',
      element: <Book />
    },
    {
      path: '/authors',
      element: <Authors />,
      title: text('routes.authors')
    },
    {
      path: '/authors/:id',
      element: <Author />,
    },
    {
      path: '/authors/:id/edit',
      element: <Author />,
    },
    // {
    //   path: '/genres',
    //   element: <Genres />,
    //   title: text('routes.genres')
    // }
  ]
  const [routes, setRoutes] = useState<TRoute[]>(routeList)

  useEffect(() => {
    setRoutes(routeList)
  }, [currentLocale])

  return routes
}
