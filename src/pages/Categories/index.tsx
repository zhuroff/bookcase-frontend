import { observer } from 'mobx-react-lite';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ListActions } from '../../components/ListActions/ListActions';
import { Pagination } from '../../components/Pagination/Pagination';
import { Preloader } from '../../components/Preloader/Preloader';
import { useApi } from '../../hooks/useApi';
import { useLocale } from '../../hooks/useLocale';
import { usePageConfig } from '../../hooks/usePageConfig';
import { TCategoriesResponse, TCategoryBasic } from '../../types/Categories';
import { TCategoriesIndexProps, TPaginatorResponse } from '../../types/Common';

export const Categories = observer(({ slug }: TCategoriesIndexProps) => {
  const { text } = useLocale()
  const { post } = useApi()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'category' })
  const [categoryListFetched, setCategoriesListFetchedState] = useState(false)
  const [categoryList, setCategoriesList] = useState<TCategoryBasic[]>([])
  const [pagePagination, setPagePagination] = useState<TPaginatorResponse | null>(null)

  const fetchCategories = () => {
    post<TCategoriesResponse>(`/api/${slug}`, pageConfig)
      .then((response) => {
        setCategoriesList(response.data.docs)
        setPagePagination(response.data.pagination)
        setCategoriesListFetchedState(true)
      })
      .catch((error) => console.dir(error))
  }

  useEffect(() => {
    if (pageConfig) fetchCategories()
  }, [pageConfig])

  useEffect(() => {
    if (categoryList.length) {
      setCategoriesListFetchedState(false)
      fetchCategories()
    }
  }, [location.pathname])

  if (!pageConfig) return null

  return (
    <>
      <header className="section__heading">
        <h2 className="section__title">
          {text(`routes.${slug}`)} ({pagePagination?.totalDocs})
        </h2>

        <ListActions
          isDraft={pageConfig.isDraft}
          createEntity={() => console.log('Create')}
          updateConfig={(payload) => {
            if (payload.isDraft) payload.page = 1
            setCategoriesListFetchedState(false)
            setPageConfig({ ...pageConfig, ...payload })
          }}
          resetConfig={() => {
            setCategoriesListFetchedState(false)
            localStorage.removeItem(slug)
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
          !categoryListFetched ?
            <Preloader /> :
            !categoryList.length ?
              <li className="cards__empty">{text('common.emptySection')}</li> :
              categoryList.map((category) => (
                <Link
                  key={category._id}
                  to={`/${slug}/${category._id}`}
                >
                  <Card>
                    <div className="card__author">
                      <Avatar
                        className="p-overlay-badge"
                        icon="pi pi-book"
                        size="large"
                      >
                        <Badge value={category.books} />
                      </Avatar>
                      <div>
                        <div className="card__author-lastname">
                          <span>{category.title}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
        }
      </ul>

      {(pagePagination && pagePagination.totalPages > 1) &&
        <Pagination
          pagination={pagePagination}
          switchPagination={(page) => {
            setCategoriesListFetchedState(false)
            setPageConfig({ ...pageConfig, page })
          }}
        />
      }
    </>
  )
})