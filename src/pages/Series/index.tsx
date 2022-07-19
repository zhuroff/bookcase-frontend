import { observer } from 'mobx-react-lite';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ListActions } from '../../components/ListActions/ListActions';
import { Pagination } from '../../components/Pagination/Pagination';
import { Preloader } from '../../components/Preloader/Preloader';
import { useApi } from '../../hooks/useApi';
import { useLocale } from '../../hooks/useLocale';
import { usePageConfig } from '../../hooks/usePageConfig';
import { TCategoriesResponse, TCategoryBasic } from '../../types/Categories';
import { TPaginatorResponse } from '../../types/Common';

export const Series = observer(() => {
  const { text } = useLocale()
  const { post } = useApi()
  const [searchParams] = useSearchParams()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'series' })
  const [seriesListFetched, setSeriesListFetchedState] = useState(false)
  const [seriesList, setSeriesList] = useState<TCategoryBasic[]>([])
  const [pagePagination, setPagePagination] = useState<TPaginatorResponse | null>(null)

  const fetchSeriess = () => {
    post<TCategoriesResponse>('/api/series', pageConfig)
      .then((response) => {
        setSeriesList(response.data.docs)
        setPagePagination(response.data.pagination)
        setSeriesListFetchedState(true)
      })
      .catch((error) => console.dir(error))
  }

  useEffect(() => {
    if (pageConfig) fetchSeriess()
  }, [pageConfig])

  if (!pageConfig) return null

  return (
    <>
      <header className="section__heading">
        <h2 className="section__title">
          {text('routes.series')} ({pagePagination?.totalDocs})
        </h2>

        <ListActions
          isDraft={pageConfig.isDraft}
          createEntity={() => console.log('Create')}
          updateConfig={(payload) => {
            if (payload.isDraft) payload.page = 1
            setSeriesListFetchedState(false)
            setPageConfig({ ...pageConfig, ...payload })
          }}
          resetConfig={() => {
            setSeriesListFetchedState(false)
            localStorage.removeItem('series')
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
          !seriesListFetched ?
            <Preloader /> :
            !seriesList.length ?
              <li className="cards__empty">{text('common.emptySection')}</li> :
              seriesList.map((series) => (
                <Link
                  key={series._id}
                  to={`/series/${series._id}`}
                >
                  <Card>
                    <div className="card__author">
                      <Avatar
                        className="p-overlay-badge"
                        icon="pi pi-book"
                        size="large"
                      >
                        <Badge value={series.books} />
                      </Avatar>
                      <div>
                        <div className="card__author-lastname">
                          <span>{series.title}</span>
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
            setSeriesListFetchedState(false)
            setPageConfig({ ...pageConfig, page })
          }}
        />
      }
    </>
  )
})