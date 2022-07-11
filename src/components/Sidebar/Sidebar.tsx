import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { useRouter } from '../../hooks/useRouter'
import { TRoute } from '../../types/Common';
import './Sidebar.scss';

export const Sidebar = observer(() => {
  const routes = useRouter()
  const { currentLocale, text, setLocale } = useLocale()

  const reducedRoutes = useMemo(() => (
    routes.reduce<Partial<TRoute[]>>((acc, { path, title }) => {
      if (title) {
        acc.push({ path, title } as TRoute)
      }

      return acc
    }, [])
  ), [routes])

  return (
    <aside className="aside">
      <nav className="aside__navbar">
        <ul className="aside__navlist">
          {
            // @ts-ignore
            reducedRoutes.map(({ path, title }) => (
              <li
                key={path}
                className="aside__navitem"
              >
                <NavLink
                  to={path}
                  className='aside__navlink'
                >{title}</NavLink>
              </li>
            ))
          }
        </ul>
      </nav>

      <div className="aside__lang">
        <ul className="aside__lang-list">
          <li className="aside__lang-item">
            <a
              className={`aside__lang-action ${currentLocale === 'ru' && '--active'}`}
              onClick={() => setLocale('ru')}
            >{text('languages.ru')}</a>
          </li>
          <li className="aside__lang-item">
            <a
              className={`aside__lang-action ${currentLocale === 'en' && '--active'}`}
              onClick={() => setLocale('en')}
            >{text('languages.en')}</a>
          </li>
        </ul>
      </div>
    </aside>
  )
})
