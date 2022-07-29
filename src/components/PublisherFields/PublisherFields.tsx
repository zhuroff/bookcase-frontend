import { observer } from 'mobx-react-lite';
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
import { ModalCategoryList } from '../ModalCategoryList/ModalCategoryList';
import { ModalHeader } from '../ModalHeader/ModalHeader';
import { PublisherSingleField } from './PublisherSingleField';

type TPublisherFieldProps = {
  isEditable: boolean
  content: TCategoryPublisherBook[]
  deleteOrRestore: (key: 'publishers', _id: string) => void
  selectPublisher: (value: TCategoryBasic, currentPublisherId: string | null) => void
  setPublisherMetadata: (_id: string, key: string, value: string) => void
}

export const PublisherFields = observer(({
  isEditable,
  content,
  deleteOrRestore,
  selectPublisher,
  setPublisherMetadata
}: TPublisherFieldProps) => {
  const { post } = useApi()
  const { text } = useLocale()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'publishers', isModal: true })
  const [searchQuery, setSearchQuery, searchResults, setSearchResults] = useSearch<TCategoryBasic[]>({ collection: 'publishers' })
  const [pagePagination, setPagePagination] = useState<TPaginatorResponse | null>(null)
  const [publishers, setPublishers] = useState<TCategoryBasic[]>([])
  const [currentPublisherId, setCurrentPublisherId] = useState<string | null>(null)

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
      <div className="book__repeater">
        {
          content.map(({ _id, publisher, city, code, isDeleted }) => (
            !isEditable ?
              <Link
                key={publisher._id}
                to={`/publishers/${publisher._id}`}
                className="card__link"
              >
                <Card>
                  <span className="card__link-primary">{publisher.title}</span>
                  {city && <em className="card__link-secondary">{city}</em>}
                  {code && <em className="card__link-secondary --italic">{code}</em>}
                </Card>
              </Link> :
              <PublisherSingleField
                key={publisher._id}
                publisher={publisher}
                city={city}
                code={code}
                isDeleted={isDeleted}
                fetchPublishers={fetchPublishers}
                setPublisherId={() => setCurrentPublisherId(_id)}
                deleteOrRestore={(key) => deleteOrRestore(key, _id)}
                setPublisherMetadata={setPublisherMetadata}
              />
          ))
        }
        {isEditable &&
          <Card>
            <div
              className="p-card-add"
              onClick={() => {
                fetchPublishers()
                setCurrentPublisherId(null)
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
        visible={publishers.length > 0}
        draggable={false}
        style={{ width: '50vw' }}
        onHide={() => setPublishers([])}
      >
        <ModalCategoryList<TCategoryBasic>
          entities={publishers}
          heading={text('common.publishers')}
          slug="publishers"
          selectEntity={(publisher) => selectPublisher(publisher, currentPublisherId)}
          clearEntities={() => setPublishers([])}
        />
      </Dialog>
    </>
  )
})
