import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ListActions } from '../../components/ListActions/ListActions';
import { Pagination } from '../../components/Pagination/Pagination';
import { Preloader } from '../../components/Preloader/Preloader';
import { Avatar } from 'primereact/avatar';
import { useApi } from '../../hooks/useApi';
import { useLocale } from '../../hooks/useLocale';
import { usePageConfig } from '../../hooks/usePageConfig';
import { TAuthorsResponse, TCategoryAuthor } from '../../types/Categories';
import { TPaginatorResponse } from '../../types/Common';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';

export const Authors = observer(() => {
  const { text } = useLocale()
  const { post } = useApi()
  const [searchParams] = useSearchParams()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'authors' })
  const [authorListFetched, setAuthorListFetchedState] = useState(false)
  const [authorList, setAuthorList] = useState<TCategoryAuthor[]>([])
  const [pagePagination, setPagePagination] = useState<TPaginatorResponse | null>(null)

  const fetchAuthors = () => {
    post<TAuthorsResponse>('/api/authors', pageConfig)
      .then((response) => {
        setAuthorList(response.data.docs)
        setPagePagination(response.data.pagination)
        setAuthorListFetchedState(true)
      })
      .catch((error) => console.dir(error))
  }

  useEffect(() => {
    if (pageConfig) fetchAuthors()
  }, [pageConfig])

  if (!pageConfig) return null

  return (
    <>
      <header className="section__heading">
        <h2 className="section__title">
          {text('routes.authors')} ({pagePagination?.totalDocs})
        </h2>

        <ListActions
          isDraft={pageConfig.isDraft}
          createEntity={() => console.log('Create')}
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
                        <Badge value={author.books} />
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

      {pagePagination &&
        <Pagination
          pagination={pagePagination}
          switchPagination={(page) => {
            setAuthorListFetchedState(false)
            setPageConfig({ ...pageConfig, page })
          }}
        />
      }
    </>
  )
})
