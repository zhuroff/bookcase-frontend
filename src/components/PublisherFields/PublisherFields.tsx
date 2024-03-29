import { observer } from 'mobx-react-lite';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useCreator } from '../../hooks/useCreator';
import { useLocale } from '../../hooks/useLocale';
import { usePageConfig } from '../../hooks/usePageConfig';
import { useSearch } from '../../hooks/useSearch';
import { TCategoryBasic, TCategoryPublisherBook } from '../../types/Categories';
import { CategoryForm } from '../CategoryView/CategoryForm';
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
  const { api: { getPaginatedList }, pagination } = useApi()
  const { text } = useLocale()
  const [createEntity] = useCreator()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'publishers', isModal: true })
  const [searchQuery, setSearchQuery, searchResults, setSearchResults] = useSearch<TCategoryBasic[]>({ collection: 'publishers' })
  const [publishers, setPublishers] = useState<TCategoryBasic[]>([])
  const [currentPublisherId, setCurrentPublisherId] = useState<string | null>(null)
  const [creatingMode, setCreatingMode] = useState(false)
  const [publisherForm, fillPublisherForm] = useReducer(
    (category: TCategoryBasic, payload: Partial<TCategoryBasic>) => ({ ...category, ...payload }),
    { isDraft: false } as TCategoryBasic
  )
  const fetchPublishers = () => {
    getPaginatedList<TCategoryBasic>('publishers', pageConfig, setPublishers)
  }

  const createNewPublisher = async () => {
    const response = await createEntity<TCategoryBasic>('publishers', publisherForm, false)

    if (response) {
      selectPublisher(response, currentPublisherId)
      setCreatingMode(false)
      setPublishers([])
    }
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
          content.map(({ _id, publisher, city, code, isDeleted }, _, publishers) => (
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
                isUndeletable={publishers.filter((el) => !el.isDeleted).length === 1}
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
        visible={publishers.length > 0}
        draggable={false}
        style={{ width: '50vw' }}
        onHide={() => setPublishers([])}
      >
        {!creatingMode ?
          <ModalCategoryList<TCategoryBasic>
            entities={publishers}
            heading={text('common.publishers')}
            slug="publishers"
            selectEntity={(publisher) => selectPublisher(publisher, currentPublisherId)}
            clearEntities={() => setPublishers([])}
          /> :
          <div className="p-dialog-form">
            <CategoryForm
              isEditable={true}
              title={publisherForm.title}
              withSaveButton={true}
              updateCategoryTitle={(title) => fillPublisherForm({ title })}
              saveCategory={createNewPublisher}
              cancelCreating={() => setCreatingMode(false)}
            />
          </div>
        }
      </Dialog>
    </>
  )
})
