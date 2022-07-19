import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { TRoute } from '../types/Common'
import { useLocale } from './useLocale'
import { Dashboard } from '../pages'
import { Books } from '../pages/Books'
import { Book } from '../pages/Books/_id'
import { Authors } from '../pages/Authors'
import { Author } from '../pages/Authors/_id'
import { Publishers } from '../pages/Publishers'
import { Publisher } from '../pages/Publishers/_id'
import { Series } from '../pages/Series'
import { SeriesPage } from '../pages/Series/_id'

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
    {
      path: '/publishers',
      element: <Publishers />,
      title: text('routes.publishers')
    },
    {
      path: '/publishers/:id',
      element: <Publisher />,
    },
    {
      path: '/publishers/:id/edit',
      element: <Publisher />,
    },
    {
      path: '/series',
      element: <Series />,
      title: text('routes.series')
    },
    {
      path: '/series/:id',
      element: <SeriesPage />,
    },
    {
      path: '/series/:id/edit',
      element: <SeriesPage />,
    },
  ]
  const [routes, setRoutes] = useState<TRoute[]>(routeList)

  useEffect(() => {
    setRoutes(routeList)
  }, [currentLocale])

  return routes
}
