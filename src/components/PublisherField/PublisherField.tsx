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
import { TCategoriesResponse, TCategoryBasic, TCategoryPublisherBook } from '../../types/Categories';
import { TPaginatorResponse } from '../../types/Common';
import { Input } from '../Input/Input';
import { ModalHeader } from '../ModalHeader/ModalHeader';

type TPublisherFieldProps = {
  isLast: boolean
  isEditable: boolean
  content: TCategoryPublisherBook
  deleteOrRestore: (key: 'publishers', _id: string) => void
  selectPublisher: (value: TCategoryBasic, isAppend: boolean) => void
  setPublisherMetadata: (_id: string, key: string, value: string) => void
}

export const PublisherField = observer(({
  isLast,
  isEditable,
  content,
  deleteOrRestore,
  selectPublisher,
  setPublisherMetadata
}: TPublisherFieldProps) => {
  const { post } = useApi()
  const { text, messages, currentLocale } = useLocale()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'publishers', isModal: true })
  const [searchQuery, setSearchQuery, searchResults, setSearchResults] = useSearch<TCategoryBasic[]>({ collection: 'publishers' })
  const [pagePagination, setPagePagination] = useState<TPaginatorResponse | null>(null)
  const [publishers, setPublishers] = useState<TCategoryBasic[]>([])
  const [isAppend, setIsAppend] = useState(false)

  const fetchPublishers = () => {
    post<TCategoriesResponse>('/api/publishers', pageConfig)
      .then((response: any) => {
        setPublishers(response.data.docs)
        setPagePagination(response.data.pagination)
      })
      .catch((error) => console.dir(error))
  }

  useEffect(() => {
    if (searchResults?.length) {
      setPublishers(searchResults)
    }
  }, [searchResults])

  useEffect(() => {
    if (publishers.length > 0 && !searchQuery.length) {
      fetchPublishers()
    }
  }, [pageConfig])

  useEffect(() => {
    if (publishers.length === 0) {
      setSearchQuery('')
      setSearchResults(null)

      if (pageConfig) {
        setPageConfig({ ...pageConfig, page: 0 })
      }
    }
  }, [publishers])

  useEffect(() => {
    if (!searchQuery.length && publishers.length) {
      fetchPublishers()
    }
  }, [searchQuery])

  return (
    <>
      {!isEditable ?
        <Link
          to={`/publishers/${content.publisher._id}`}
          className="card__link"
        >
          <Card>
            <span className="card__link-primary">{content.publisher.title}</span>
            {content.city &&
              <em className="card__link-secondary">{content.city}</em>
            }
            {content.code &&
              <em className="card__link-secondary --italic">{content.code}</em>
            }
          </Card>
        </Link> :
        <>
          <Card className={content.isDeleted ? '--deleted' : ''}>
            {content.isDeleted &&
              <Button
                icon="pi pi-undo"
                className="p-button-rounded p-button-warning --undo"
                onClick={() => deleteOrRestore('publishers', content._id)}
              />
            }

            <Button
              icon="pi pi-times"
              className="p-button-rounded p-button-secondary --delete"
              onClick={() => deleteOrRestore('publishers', content._id)}
            />

            <Button
              label={content.publisher.title}
              onClick={() => {
                fetchPublishers()
                setIsAppend(false)
              }}
              className="p-button-outlined"
            />

            <Input
              name={`city:${content._id}`}
              type="text"
              value={content.city || ''}
              size="small"
              noBorder={true}
              onInput={(e) => setPublisherMetadata(content.publisher._id, 'city', e.currentTarget.value)}
            />

            <Input
              name={`code:${content._id}`}
              type="text"
              value={content.code || ''}
              size="small"
              noBorder={true}
              onInput={(e) => setPublisherMetadata(content.publisher._id, 'code', e.currentTarget.value)}
            />
          </Card>
          {
            isLast &&
            <Card>
              <div
                className="p-card-add"
                onClick={() => {
                  fetchPublishers()
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
        visible={publishers.length > 0}
        draggable={false}
        style={{ width: '50vw' }}
        onHide={() => setPublishers([])}
      >
        <Card style={{ backgroundColor: 'var(--surface-100)' }}>
          <h3 className='p-card-heading'>{text('common.authors')}</h3>
          <ul className='p-card-list'>
            {
              publishers.map((publisher) => (
                <li
                  key={publisher._id}
                  className='p-card-item'
                >
                  <Button
                    className={'p-button-sm p-button-secondary p-button-outlined'}
                    onClick={() => {
                      selectPublisher(publisher, isAppend)
                      setPublishers([])
                    }}
                  >{text('common.select')}</Button>

                  <Link
                    to={`/authors/${publisher._id}`}
                    className='p-card-link'
                    style={{ marginLeft: '1rem' }}
                  >{publisher.title}</Link>
                </li>
              ))
            }
          </ul>
        </Card>
      </Dialog>
    </>
  )
})
