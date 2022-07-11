import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { TCategoriesResponse, TCategoryAuthor, TCategoryAuthorBook } from '../../types/Categories';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { usePageConfig } from '../../hooks/usePageConfig';
import { useSearch } from '../../hooks/useSearch';
import { Dropdown } from 'primereact/dropdown';
import { TPaginatorResponse } from '../../types/Common';
import { ModalHeader } from '../ModalHeader/ModalHeader';

type TAuthorFieldProps = {
  isLast: boolean
  isEditable: boolean
  content: TCategoryAuthorBook
  selectAuthor: (value: TCategoryAuthor, isAppend: boolean) => void
  setAuthorRole: (value: string) => void
  deleteOrRestoreAuthor: (_id: string, value: boolean) => void
}

export const AuthorField = observer(({
  isLast,
  isEditable,
  content,
  selectAuthor,
  setAuthorRole,
  deleteOrRestoreAuthor
}: TAuthorFieldProps) => {
  const { text, messages, currentLocale } = useLocale()
  const { post } = useApi()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'authors', isModal: true })
  const [searchQuery, setSearchQuery, searchResults, setSearchResults] = useSearch<TCategoryAuthor[]>({ collection: 'authors' })
  const [pagePagination, setPagePagination] = useState<TPaginatorResponse | null>(null)
  const [authors, setAuthors] = useState<TCategoryAuthor[]>([])
  const [isAppend, setIsAppend] = useState(false)

  const authorRoles = Object.entries(messages[currentLocale].messages.authors.roles)
    .reduce((acc, [key, value]) => {
      acc.push({ value: key, label: value })
      return acc
    }, [] as { value: string; label: string }[])

  const fetchAuthors = () => {
    post<TCategoriesResponse>('/api/authors', pageConfig)
      .then((response: any) => {
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

  return (
    <>
      {!isEditable ?
        <Link
          to={`/authors/${content.author._id}`}
          className="card__link"
        >
          <Card>
            <span className="card__link-primary">{content.author.title}</span>
            <br />
            <em className="card__link-secondary">{text(`authors.roles.${content.role}`)}</em>
          </Card>
        </Link> :
        <>
          <Card className={content.isDeleted ? '--deleted' : ''}>
            {content.isDeleted &&
              <Button
                icon="pi pi-undo"
                className="p-button-rounded p-button-warning --undo"
                onClick={() => deleteOrRestoreAuthor(content._id, false)}
              />
            }

            <Button
              icon="pi pi-times"
              className="p-button-rounded p-button-secondary --delete"
              onClick={() => deleteOrRestoreAuthor(content._id, true)}
            />

            <Button
              label={content.author.title}
              onClick={() => {
                fetchAuthors()
                setIsAppend(false)
              }}
              className="p-button-outlined"
            />

            <Dropdown
              options={authorRoles}
              value={content.role}
              placeholder={text('authors.rolesPlaceholder')}
              onChange={(e) => setAuthorRole(e.value)}
            />
          </Card>
          {
            isLast &&
            <Card>
              <div
                className="p-card-add"
                onClick={() => {
                  fetchAuthors()
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
        visible={authors.length > 0}
        draggable={false}
        style={{ width: '50vw' }}
        onHide={() => setAuthors([])}
      >
        <Card style={{ backgroundColor: 'var(--surface-100)' }}>
          <h3 className='p-card-heading'>{text('common.authors')}</h3>
          <ul className='p-card-list'>
            {
              authors.map((author) => (
                <li
                  key={author._id}
                  className='p-card-item'
                >
                  <Button
                    className={'p-button-sm p-button-secondary p-button-outlined'}
                    onClick={() => {
                      selectAuthor(author, isAppend)
                      setAuthors([])
                    }}
                  >{text('common.select')}</Button>

                  <Link
                    to={`/authors/${author._id}`}
                    className='p-card-link'
                    style={{ marginLeft: '1rem' }}
                  >{author.title}</Link>
                </li>
              ))
            }
          </ul>
        </Card>
      </Dialog>
    </>
  )
})