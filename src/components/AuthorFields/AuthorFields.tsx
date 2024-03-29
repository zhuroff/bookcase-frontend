import { observer } from 'mobx-react-lite';
import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { TCategoryAuthor, TCategoryAuthorBook } from '../../types/Categories';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { useApi } from '../../hooks/useApi';
import { usePageConfig } from '../../hooks/usePageConfig';
import { useSearch } from '../../hooks/useSearch';
import { ModalHeader } from '../ModalHeader/ModalHeader';
import { ModalCategoryList } from '../ModalCategoryList/ModalCategoryList';
import { AuthorSingleField } from './AuthorSingleField';
import { AuthorForm } from '../AuthorView/AuthorForm';
import { useCreator } from '../../hooks/useCreator';

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
  const { api: { getPaginatedList }, pagination } = useApi()
  const [create] = useCreator()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'authors', isModal: true })
  const [searchQuery, setSearchQuery, searchResults, setSearchResults] = useSearch<TCategoryAuthor[]>({ collection: 'authors' })
  const [authors, setAuthors] = useState<TCategoryAuthor[]>([])
  const [currentAuthorId, setCurrentAuthorId] = useState<string | null>(null)
  const [creatingMode, setCreatingMode] = useState(false)
  const [authorForm, fillAuthorForm] = useReducer(
    (author: TCategoryAuthor, payload: Partial<TCategoryAuthor>) => ({ ...author, ...payload }),
    { isDraft: false } as TCategoryAuthor
  )

  const fetchAuthors = () => {
    getPaginatedList<TCategoryAuthor>('authors', pageConfig, setAuthors)
  }

  const createNewAuthor = async () => {
    const response = await create<TCategoryAuthor>('authors', authorForm, false)

    if (response) {
      selectAuthor(response, currentAuthorId)
      setCreatingMode(false)
      setAuthors([])
    }
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
          content.map(({ _id, author, role, isDeleted }, _, authors) => (
            !isEditable ?
              <Card key={author._id}>
                <Link to={`/authors/${author._id}`}>
                  <span className="card__link-primary">{author.title}</span>
                  <span className="card__link-secondary">{text(`authors.roles.${role}`)}</span>
                </Link>
              </Card> :
              <AuthorSingleField
                key={author._id}
                author={author}
                role={role}
                isDeleted={isDeleted}
                isUndeletable={authors.filter((el) => !el.isDeleted).length === 1}
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
        header={!creatingMode && <ModalHeader
          searchName="modalSearch"
          searchQuery={searchQuery}
          isCreatable={true}
          pagePagination={pagination}
          setSearchQuery={(value) => setSearchQuery(value)}
          createEntity={() => setCreatingMode(true)}
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
        {!creatingMode ?
          <ModalCategoryList<TCategoryAuthor>
            entities={authors}
            heading={text('common.authors')}
            slug="authors"
            selectEntity={(author) => selectAuthor(author, currentAuthorId)}
            clearEntities={() => setAuthors([])}
          /> :
          <div className="p-dialog-form">
            <AuthorForm
              isEditable={true}
              withSaveButton={true}
              firstName={authorForm.firstName}
              lastName={authorForm.lastName}
              patronymicName={authorForm.patronymicName}
              updateAuthorName={(value, key) => fillAuthorForm({ [key]: value })}
              saveAuthor={createNewAuthor}
              cancelCreating={() => setCreatingMode(false)}
            />
          </div>
        }
      </Dialog>
    </>
  )
})