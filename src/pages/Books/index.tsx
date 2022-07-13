import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ListActions } from '../../components/ListActions/ListActions';
import { BookCard } from '../../components/BookCard/BookCard';
import { Preloader } from '../../components/Preloader/Preloader';
import { Pagination } from '../../components/Pagination/Pagination';
import { useApi } from '../../hooks/useApi';
import { useLocale } from '../../hooks/useLocale';
import { TBooksListItem, TBooksResponse } from '../../types/Books';
import { TPaginatorResponse } from '../../types/Common';
import { usePageConfig } from '../../hooks/usePageConfig';
import { TCategoriesResponse, TCategoryBasic } from '../../types/Categories';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

export const Books = observer(() => {
  const navigate = useNavigate()
  const { text } = useLocale()
  const { post } = useApi()
  const [searchParams] = useSearchParams()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'books' })
  const [bookListFetched, setBookListFetchedState] = useState(false)
  const [genres, setGenres] = useState<TCategoryBasic[]>([])
  const [bookList, setBookList] = useState<TBooksListItem[]>([])
  const [pagePagination, setPagePagination] = useState<TPaginatorResponse | null>(null)

  const fetchBooks = () => {
    post<TBooksResponse>('/api/books', pageConfig)
      .then((response) => {
        setBookList(response.data.docs)
        setPagePagination(response.data.pagination)
        setBookListFetchedState(true)
      })
      .catch((error) => console.dir(error))
  }

  const fetchGenres = () => {
    post<TCategoriesResponse>('/api/genres', {
      page: 1,
      sort: { title: 1 },
      limit: 50,
      isDraft: false
    })
      .then((response) => setGenres(response.data.docs))
      .catch((error) => console.dir(error))
  }

  const genresOptions = (placeholder: string) => {
    return genres.map(({ _id, title }) => ({
      label: `${placeholder}: ${title}`,
      value: _id
    }))
  }

  useEffect(() => {
    if (pageConfig) {

      fetchBooks()
    }
  }, [pageConfig])

  useEffect(() => {
    fetchGenres()
  }, [])

  if (!pageConfig) return null

  return (
    <>
      <header className="section__heading">
        <h2 className="section__title">
          {text('routes.books')} ({pagePagination?.totalDocs})
        </h2>

        <ListActions
          isDraft={pageConfig.isDraft}
          createEntity={() => console.log('Create')}
          updateConfig={(payload) => {
            if (payload.isDraft) payload.page = 1
            setBookListFetchedState(false)
            setPageConfig({ ...pageConfig, ...payload })
          }}
          resetConfig={() => {
            setBookListFetchedState(false)
            localStorage.removeItem('books')
            setPageConfig({
              page: searchParams.get('page') || 1,
              sort: { title: 1 },
              limit: 30,
              isDraft: false,
              unlistedOf: '',
              paperWithoutFile: false
            })
          }}
        >
          {genres.length > 0 &&
            <>
              <Dropdown
                value={pageConfig.unlistedOf}
                placeholder={text('common.unlistTitle')}
                options={genresOptions(text('common.unlistTitle'))}
                onChange={(e) => {
                  setBookListFetchedState(false)
                  setPageConfig({ ...pageConfig, unlistedOf: e.value, page: 1 })
                }}
              />
              <Button
                className={`p-button-sm p-button-secondary ${!pageConfig.paperWithoutFile && 'p-button-outlined'}`}
                icon="pi pi-file-excel"
                title={text('common.withoutFile')}
                onClick={() => {
                  setBookListFetchedState(false)
                  setPageConfig({
                    ...pageConfig,
                    paperWithoutFile: !pageConfig.paperWithoutFile,
                    page: 1
                  })
                }}
              />
              <Button
                className={`p-button-sm p-button-secondary ${!pageConfig.accountableOnly && 'p-button-outlined'}`}
                icon="pi pi-check-square"
                title={text('book.params.unnecessary.filterTitle')}
                onClick={() => {
                  setBookListFetchedState(false)
                  setPageConfig({
                    ...pageConfig,
                    accountableOnly: !pageConfig.accountableOnly,
                    page: 1
                  })
                }}
              />
            </>
          }
        </ListActions>
      </header>
      <ul className="cards">
        {
          !bookListFetched
            ? <Preloader />
            : !bookList.length
              ? <li className="cards__empty">{text('common.emptySection')}</li>
              : bookList.map((book) => (
                <BookCard
                  key={book._id}
                  route={book._id}
                  title={book.title}
                  status={book.status}
                  coverImage={book.coverImage}
                  authors={book.authors}
                  genres={book.genres}
                  lists={book.lists}
                  accountability={book.accountability}
                  onClick={() => navigate(`/books/${book._id}`)}
                />
              ))
        }
      </ul>

      {pagePagination &&
        <Pagination
          pagination={pagePagination}
          switchPagination={(page) => {
            setBookListFetchedState(false)
            setPageConfig({ ...pageConfig, page })
          }}
        />
      }
    </>
  )
})
