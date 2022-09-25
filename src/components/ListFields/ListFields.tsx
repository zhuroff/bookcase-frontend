import { observer } from 'mobx-react-lite';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useLocale } from '../../hooks/useLocale';
import { usePageConfig } from '../../hooks/usePageConfig';
import { useSearch } from '../../hooks/useSearch';
import { TCategoryBasic } from '../../types/Categories';
import { TEntityBasic } from '../../types/Common';
import { TBookList } from '../../types/List';
import { ModalCategoryList } from '../ModalCategoryList/ModalCategoryList';
import { ModalHeader } from '../ModalHeader/ModalHeader';
import { ListSingleField } from './ListSingleField';

type TListFieldProps = {
  isEditable: boolean
  content: TBookList[]
  bookId: string
  setSublist: (listId: string, oldValue: string, newValue: TEntityBasic) => void
  deleteOrRestore: (key: 'lists', _id: string) => void
  selectList: (value: TBookList, currentListId: string | null) => void
  addSublist: (listId: string) => void
  removeSublist: (listId: string, sublistId: string) => void
}

export const ListFields = observer(({
  isEditable,
  content,
  bookId,
  setSublist,
  deleteOrRestore,
  selectList,
  addSublist,
  removeSublist
}: TListFieldProps) => {
  const { api: { getPaginatedList } } = useApi()
  const { text } = useLocale()
  const [lists, setLists] = useState<TCategoryBasic[]>([])
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'lists', isModal: true })
  const [searchQuery, setSearchQuery, searchResults, setSearchResults] = useSearch<TCategoryBasic[]>({ collection: 'lists' })
  const [currentListId, setCurrentListId] = useState<string | null>(null)

  const fetchLists = () => {
    getPaginatedList<TCategoryBasic>('lists', pageConfig, setLists)
  }

  useEffect(() => {
    if (searchResults?.length) {
      setLists(searchResults)
    }
  }, [searchResults])

  useEffect(() => {
    if (lists.length > 0 && !searchQuery.length) {
      fetchLists()
    }
  }, [pageConfig])

  useEffect(() => {
    if (lists.length === 0) {
      setSearchQuery('')
      setSearchResults(null)

      if (pageConfig) {
        setPageConfig({ ...pageConfig, page: 0 })
      }
    }
  }, [lists])

  useEffect(() => {
    if (!searchQuery.length && lists.length) {
      fetchLists()
    }
  }, [searchQuery])

  return (
    <>
      <div className="book__repeater">
        <>
          {
            content.map((list) => (
              !isEditable ?
                <Card key={list._id}>
                  <Link to={`/lists/${list._id}`}>
                    <span className="card__link-primary">{list.title}</span>
                  </Link>
                  {list.lists.map(({ title, _id }) => (
                    <Link
                      key={_id}
                      to={`/lists/${list._id}?book=${bookId}`}
                    >
                      <span className="card__link-secondary">{title}</span>
                    </Link>
                  ))}
                </Card> :
                <ListSingleField
                  key={list._id}
                  list={list}
                  setListId={(_id) => setCurrentListId(_id)}
                  sublistPlaceholder={text('lists.sublistPlaceholder')}
                  setSublist={setSublist}
                  deleteOrRestore={deleteOrRestore}
                  addSublist={addSublist}
                  removeSublist={removeSublist}
                  fetchLists={fetchLists}
                />
            ))
          }
          {
            isEditable &&
            <Card>
              <div
                className="p-card-add"
                onClick={() => {
                  fetchLists()
                  setCurrentListId(null)
                }}
              >
                <span className="pi pi-plus"></span>
              </div>
            </Card>
          }
        </>
      </div>

      <Dialog
        header={<ModalHeader
          searchName="modalSearch"
          searchQuery={searchQuery}
          isCreatable={true}
          setSearchQuery={(value) => setSearchQuery(value)}
          switchPagination={(page) => {
            if (pageConfig) {
              setPageConfig({ ...pageConfig, page })
            }
          }}
        />}
        visible={lists.length > 0}
        draggable={false}
        style={{ width: '50vw' }}
        onHide={() => setLists([])}
      >
        <ModalCategoryList<TCategoryBasic>
          entities={lists}
          heading={text('common.lists')}
          slug="lists"
          selectEntity={(list) => selectList({ ...list, lists: [{ title: '', _id: String(lists.length) }] }, currentListId)}
          clearEntities={() => setLists([])}
        />
      </Dialog>
    </>
  )
})
