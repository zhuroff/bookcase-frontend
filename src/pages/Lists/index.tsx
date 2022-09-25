import { observer } from 'mobx-react-lite';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ListActions } from '../../components/ListActions/ListActions';
import { Preloader } from '../../components/Preloader/Preloader';
import { useApi } from '../../hooks/useApi';
import { useLocale } from '../../hooks/useLocale';
import { usePageConfig } from '../../hooks/usePageConfig';
import { TCategoryBasic } from '../../types/Categories';

export const Lists = observer(() => {
  const { api: { getPaginatedList } } = useApi()
  const { text } = useLocale()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'list' })
  const [listFetched, setListFetchedState] = useState(false)
  const [list, setList] = useState<TCategoryBasic[]>([])

  const fetchLists = () => {
    getPaginatedList<TCategoryBasic>('lists', pageConfig, setList)
      .then(() => setListFetchedState(true))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    if (pageConfig) fetchLists()
  }, [pageConfig])

  useEffect(() => {
    if (list.length) {
      setListFetchedState(false)
      fetchLists()
    }
  }, [location.pathname])

  if (!pageConfig) return null

  return (
    <>
      <header className="section__heading">
        <h2 className="section__title">{text('routes.lists')}</h2>

        <ListActions
          isDraft={pageConfig.isDraft}
          createEntity={() => console.log('Create')}
          updateConfig={(payload) => {
            if (payload.isDraft) payload.page = 1
            setListFetchedState(false)
            setPageConfig({ ...pageConfig, ...payload })
          }}
          resetConfig={() => {
            setListFetchedState(false)
            localStorage.removeItem('list')
            setPageConfig({
              page: searchParams.get('page') || 1,
              sort: { title: 1 },
              limit: 30,
              isDraft: false
            })
          }}
        />
      </header>

      <ul className="cards">
        {
          !listFetched ?
            <Preloader /> :
            !list.length ?
              <li className="cards__empty">{text('common.emptySection')}</li> :
              list.map((item) => (
                <Link
                  key={item._id}
                  to={`/lists/${item._id}`}
                >
                  <Card>
                    <div className="card__author">
                      <Avatar
                        className="p-overlay-badge"
                        icon="pi pi-book"
                        size="large"
                      >
                        <Badge value={item.booksCount} />
                      </Avatar>
                      <div>
                        <div className="card__author-lastname">
                          <span>{item.title}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
        }
      </ul>
    </>
  )
})