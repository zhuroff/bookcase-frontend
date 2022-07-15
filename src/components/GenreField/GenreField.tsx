import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useLocale } from '../../hooks/useLocale';
import { usePageConfig } from '../../hooks/usePageConfig';
import { useSearch } from '../../hooks/useSearch';
import { TCategoriesResponse, TCategoryBasic } from '../../types/Categories';
import { TPaginatorResponse } from '../../types/Common';
import { ModalHeader } from '../ModalHeader/ModalHeader';

type TGenreFieldProps = {
  isLast: boolean
  isEditable: boolean
  content: TCategoryBasic
  deleteOrRestore: (key: 'genres', _id: string) => void
  selectGenre: (value: TCategoryBasic, isAppend: boolean) => void
}

export const GenreField = observer(({
  isLast,
  isEditable,
  content,
  deleteOrRestore,
  selectGenre
}: TGenreFieldProps) => {
  const { post } = useApi()
  const { text } = useLocale()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'genres', isModal: true })
  const [searchQuery, setSearchQuery, searchResults, setSearchResults] = useSearch<TCategoryBasic[]>({ collection: 'genres' })
  const [pagePagination, setPagePagination] = useState<TPaginatorResponse | null>(null)
  const [genres, setGenres] = useState<TCategoryBasic[]>([])
  const [isAppend, setIsAppend] = useState(false)

  const fetchGenres = () => {
    post<TCategoriesResponse>('/api/genres', pageConfig)
      .then((response: any) => {
        setGenres(response.data.docs)
        setPagePagination(response.data.pagination)
      })
      .catch((error) => console.dir(error))
  }

  useEffect(() => {
    if (searchResults?.length) {
      setGenres(searchResults)
    }
  }, [searchResults])

  useEffect(() => {
    if (genres.length > 0 && !searchQuery.length) {
      fetchGenres()
    }
  }, [pageConfig])

  useEffect(() => {
    if (genres.length === 0) {
      setSearchQuery('')
      setSearchResults(null)

      if (pageConfig) {
        setPageConfig({ ...pageConfig, page: 0 })
      }
    }
  }, [genres])

  useEffect(() => {
    if (!searchQuery.length && genres.length) {
      fetchGenres()
    }
  }, [searchQuery])

  return (
    <>
      {!isEditable ?
        <Link
          to={`/genres/${content._id}`}
          className="card__link"
        >
          <Card>
            <span className="card__link-primary">{content.title}</span>
          </Card>
        </Link> :
        <>
          <Card className={content.isDeleted ? '--deleted' : ''}>
            {content.isDeleted &&
              <Button
                icon="pi pi-undo"
                className="p-button-rounded p-button-warning --undo"
                onClick={() => deleteOrRestore('genres', content._id)}
              />
            }

            <Button
              icon="pi pi-times"
              className="p-button-rounded p-button-secondary --delete"
              onClick={() => deleteOrRestore('genres', content._id)}
            />

            <Button
              label={content.title}
              onClick={() => {
                fetchGenres()
                setIsAppend(false)
              }}
              className="p-button-outlined"
            />
          </Card>
          {
            isLast &&
            <Card>
              <div
                className="p-card-add"
                onClick={() => {
                  fetchGenres()
                  setIsAppend(true)
                }}
              >
                <span className="pi pi-plus"></span>
              </div>
            </Card>
          }
        </>
      }

      <Dialog
        header={<ModalHeader
          searchName="modalSearch"
          searchQuery={searchQuery}
          isCreatable={true}
          pagePagination={pagePagination}
          setSearchQuery={(value) => setSearchQuery(value)}
          switchPagination={(page) => {
            if (pageConfig) {
              setPageConfig({ ...pageConfig, page })
            }
          }}
        />}
        visible={genres.length > 0}
        draggable={false}
        style={{ width: '50vw' }}
        onHide={() => setGenres([])}
      >
        <Card style={{ backgroundColor: 'var(--surface-100)' }}>
          <h3 className='p-card-heading'>{text('common.authors')}</h3>
          <ul className='p-card-list'>
            {
              genres.map((genre) => (
                <li
                  key={genre._id}
                  className='p-card-item'
                >
                  <Button
                    className={'p-button-sm p-button-secondary p-button-outlined'}
                    onClick={() => {
                      selectGenre(genre, isAppend)
                      setGenres([])
                    }}
                  >{text('common.select')}</Button>

                  <Link
                    to={`/authors/${genre._id}`}
                    className='p-card-link'
                    style={{ marginLeft: '1rem' }}
                  >{genre.title}</Link>
                </li>
              ))
            }
          </ul>
        </Card>
      </Dialog>
    </>
  )
})
