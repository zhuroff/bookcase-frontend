import { observer } from 'mobx-react-lite';
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
import { ModalCategoryList } from '../ModalCategoryList/ModalCategoryList';
import { ModalHeader } from '../ModalHeader/ModalHeader';
import { GenreSingleField } from './GenreSingleField';

type TGenreFieldsProps = {
  isEditable: boolean
  content: TCategoryBasic[]
  deleteOrRestore: (key: 'genres', _id: string) => void
  selectGenre: (value: TCategoryBasic, currentGenreId: string | null) => void
}

export const GenreFields = observer(({
  isEditable,
  content,
  deleteOrRestore,
  selectGenre
}: TGenreFieldsProps) => {
  const { post } = useApi()
  const { text } = useLocale()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'genres', isModal: true })
  const [searchQuery, setSearchQuery, searchResults, setSearchResults] = useSearch<TCategoryBasic[]>({ collection: 'genres' })
  const [pagePagination, setPagePagination] = useState<TPaginatorResponse | null>(null)
  const [genres, setGenres] = useState<TCategoryBasic[]>([])
  const [currentGenreId, setCurrentGenreId] = useState<string | null>(null)

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
      <div className="book__repeater">
        {
          content.map((genre) => (
            !isEditable ?
              <Link
                key={genre._id}
                to={`/genres/${genre._id}`}
                className="card__link"
              >
                <Card>
                  <span className="card__link-primary">{genre.title}</span>
                </Card>
              </Link> :
              <GenreSingleField
                key={genre._id}
                genre={genre}
                isDeleted={genre.isDeleted}
                fetchGenres={fetchGenres}
                setGenreId={() => setCurrentGenreId(genre._id)}
                deleteOrRestore={(key) => deleteOrRestore(key, genre._id)}
              />
          ))
        }
        {isEditable &&
          <Card>
            <div
              className="p-card-add"
              onClick={() => {
                fetchGenres()
                setCurrentGenreId(null)
              }}
            >
              <span className="pi pi-plus"></span>
            </div>
          </Card>
        }
      </div>

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
        <ModalCategoryList<TCategoryBasic>
          entities={genres}
          heading={text('common.genres')}
          slug="genres"
          selectEntity={(genre) => selectGenre(genre, currentGenreId)}
          clearEntities={() => setGenres([])}
        />
      </Dialog>
    </>
  )
})