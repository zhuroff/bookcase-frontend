import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { TRoute } from '../types/Common'
import { useLocale } from './useLocale'
import { Dashboard } from '../pages'
import { Books } from '../pages/Books'
import { Book } from '../pages/Books/_id'
import { Authors } from '../pages/Authors'
import { Author } from '../pages/Authors/_id'
import { Categories } from '../pages/Categories'
import { Category } from '../pages/Categories/_id'
import { Lists } from '../pages/Lists'
import { ListPage } from '../pages/Lists/_id'

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
      element: <Categories slug="publishers" />,
      title: text('routes.publishers')
    },
    {
      path: '/publishers/:id',
      element: <Category slug="publishers" />,
    },
    {
      path: '/publishers/:id/edit',
      element: <Category slug="publishers" />,
    },
    {
      path: '/series',
      element: <Categories slug="series" />,
      title: text('routes.series')
    },
    {
      path: '/series/:id',
      element: <Category slug="series" />,
    },
    {
      path: '/series/:id/edit',
      element: <Category slug="series" />,
    },
    {
      path: '/genres',
      element: <Categories slug="genres" />,
      title: text('routes.genres')
    },
    {
      path: '/genres/:id',
      element: <Category slug="genres" />,
    },
    {
      path: '/genres/:id/edit',
      element: <Category slug="genres" />,
    },
    {
      path: '/lists',
      element: <Lists />,
      title: text('routes.lists')
    },
    {
      path: '/lists/:id',
      element: <ListPage />,
    },
    {
      path: '/lists/:id/edit',
      element: <ListPage />,
    },
  ]
  const [routes, setRoutes] = useState<TRoute[]>(routeList)

  useEffect(() => {
    setRoutes(routeList)
  }, [currentLocale])

  return routes
}
