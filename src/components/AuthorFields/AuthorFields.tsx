import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { TAuthorsResponse, TCategoryAuthor, TCategoryAuthorBook } from '../../types/Categories';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { useApi } from '../../hooks/useApi';
import { usePageConfig } from '../../hooks/usePageConfig';
import { useSearch } from '../../hooks/useSearch';
import { TPaginatorResponse } from '../../types/Common';
import { ModalHeader } from '../ModalHeader/ModalHeader';
import { ModalCategoryList } from '../ModalCategoryList/ModalCategoryList';
import { AuthorSingleField } from './AuthorSingleField';

type TAuthorFieldsProps = {
  isEditable: boolean
  content: TCategoryAuthorBook[]
  selectAuthor: (value: TCategoryAuthor, currentAuthorId: string | null) => void
  setAuthorRole: (value: string, _id: string) => void
  deleteOrRestore: (key: 'authors', _id: string) => void
}

export const AuthorFields = observer(({
  isEditable,
  content,
  selectAuthor,
  setAuthorRole,
  deleteOrRestore
}: TAuthorFieldsProps) => {
  const { text } = useLocale()
  const { post } = useApi()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'authors', isModal: true })
  const [searchQuery, setSearchQuery, searchResults, setSearchResults] = useSearch<TCategoryAuthor[]>({ collection: 'authors' })
  const [pagePagination, setPagePagination] = useState<TPaginatorResponse | null>(null)
  const [authors, setAuthors] = useState<TCategoryAuthor[]>([])
  const [currentAuthorId, setCurrentAuthorId] = useState<string | null>(null)

  const fetchAuthors = () => {
    post<TAuthorsResponse>('/api/authors', pageConfig)
      .then((response) => {
        setAuthors(response.data.docs)
        setPagePagination(response.data.pagination)
      })
      .catch((error) => console.dir(error))
  }

  useEffect(() => {
    if (searchResults?.length) {
      setAuthors(searchResults)
    }
  }, [searchResults])

  useEffect(() => {
    if (authors.length > 0 && !searchQuery.length) {
      fetchAuthors()
    }
  }, [pageConfig])

  useEffect(() => {
    if (authors.length === 0) {
      setSearchQuery('')
      setSearchResults(null)

      if (pageConfig) {
        setPageConfig({ ...pageConfig, page: 0 })
      }
    }
  }, [authors])

  useEffect(() => {
    if (!searchQuery.length && authors.length) {
      fetchAuthors()
    }
  }, [searchQuery])

  if (!pageConfig) return null

  return (
    <>
      <div className="book__repeater">
        {
          content.map(({ _id, author, role, isDeleted }) => (
            !isEditable ?
              <Card key={author._id}>
                <Link to={`/authors/${author._id}`}>
                  <span className="card__link-primary">{author.title}</span>
                  <span className="card__link-secondary">{role}</span>
                </Link>
              </Card> :
              <AuthorSingleField
                key={author._id}
                author={author}
                role={role}
                isDeleted={isDeleted}
                dropdownPlaceholder={text('authors.rolesPlaceholder')}
                setAuthorId={() => setCurrentAuthorId(_id)}
                deleteOrRestore={(key) => deleteOrRestore(key, _id)}
                fetchAuthors={fetchAuthors}
                setAuthorRole={setAuthorRole}
              />
          ))
        }
        {
          isEditable &&
          <Card>
            <div
              className="p-card-add"
              onClick={() => {
                fetchAuthors()
                setCurrentAuthorId(null)
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
        visible={authors.length > 0}
        draggable={false}
        style={{ width: '50vw' }}
        onHide={() => setAuthors([])}
      >
        <ModalCategoryList<TCategoryAuthor>
          entities={authors}
          heading={text('common.authors')}
          slug="authors"
          selectEntity={(author) => selectAuthor(author, currentAuthorId)}
          clearEntities={() => setAuthors([])}
        />
      </Dialog>
    </>
  )
})