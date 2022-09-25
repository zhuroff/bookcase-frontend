import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ListActions } from '../../components/ListActions/ListActions';
import { Pagination } from '../../components/Pagination/Pagination';
import { Preloader } from '../../components/Preloader/Preloader';
import { Avatar } from 'primereact/avatar';
import { useApi } from '../../hooks/useApi';
import { useCreator } from '../../hooks/useCreator'
import { useLocale } from '../../hooks/useLocale';
import { usePageConfig } from '../../hooks/usePageConfig';
import { TCategoryAuthor } from '../../types/Categories';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';

export const Authors = observer(() => {
  const { text } = useLocale()
  const { api: { getPaginatedList }, pagination } = useApi()
  const [searchParams] = useSearchParams()
  const [createEntity] = useCreator()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'authors' })
  const [authorListFetched, setAuthorListFetchedState] = useState(false)
  const [authorList, setAuthorList] = useState<TCategoryAuthor[]>([])

  const fetchAuthors = () => {
    getPaginatedList<TCategoryAuthor>('authors', pageConfig, setAuthorList)
      .then(() => setAuthorListFetchedState(true))
  }

  useEffect(() => {
    if (pageConfig) fetchAuthors()
  }, [pageConfig])

  if (!pageConfig) return null

  return (
    <>
      <header className="section__heading">
        <h2 className="section__title">
          {text('routes.authors')} ({pagination?.totalDocs})
        </h2>

        <ListActions
          isDraft={pageConfig.isDraft}
          createEntity={() => createEntity('authors', { isDraft: true })}
          updateConfig={(payload) => {
            if (payload.isDraft) payload.page = 1
            setAuthorListFetchedState(false)
            setPageConfig({ ...pageConfig, ...payload })
          }}
          resetConfig={() => {
            setAuthorListFetchedState(false)
            localStorage.removeItem('authors')
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
          !authorListFetched ?
            <Preloader /> :
            !authorList.length ?
              <li className="cards__empty">{text('common.emptySection')}</li> :
              authorList.map((author) => (
                <Link
                  key={author._id}
                  to={`/authors/${author._id}`}
                >
                  <Card>
                    <div className="card__author">
                      <Avatar
                        className="p-overlay-badge"
                        icon="pi pi-book"
                        size="large"
                      >
                        <Badge value={author.booksCount} />
                      </Avatar>
                      <div>
                        <div className="card__author-lastname">
                          {author.lastName && <span>{author.lastName}</span>}
                        </div>
                        <div>
                          {author.firstName && <span>{author.firstName} </span>}
                          {author.patronymicName && <span>{author.patronymicName}</span>}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
        }
      </ul>

      {pagination &&
        <Pagination
          pagination={pagination}
          switchPagination={(page) => {
            setAuthorListFetchedState(false)
            setPageConfig({ ...pageConfig, page })
          }}
        />
      }
    </>
  )
})
