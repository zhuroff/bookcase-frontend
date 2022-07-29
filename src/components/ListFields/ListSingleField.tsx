import { useEffect, useMemo, useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { TCategoryMin } from '../../types/Categories';
import { TBookList, TListPage } from '../../types/List';
import { ListSingleSublist } from './ListSingleSublist';
import { useApi } from '../../hooks/useApi';

type TListFieldProps = {
  list: TBookList
  sublistPlaceholder: string
  setListId: (listId: string) => void
  setSublist: (listId: string, oldValue: string, newValue: TCategoryMin) => void
  deleteOrRestore: (key: 'lists', _id: string) => void
  addSublist: (listId: string) => void
  removeSublist: (listId: string, sublistId: string) => void
  fetchLists: () => void
}

export const ListSingleField = ({
  list,
  sublistPlaceholder,
  setListId,
  setSublist,
  deleteOrRestore,
  addSublist,
  removeSublist,
  fetchLists
}: TListFieldProps) => {
  const { get } = useApi()
  const [fullSublist, setFullSublist] = useState<TCategoryMin[]>([])

  const sublistOptions = useMemo(() => (
    fullSublist.filter((sublist) => (
      !list.lists.some(({ _id }) => _id === sublist._id)
    ))
  ), [fullSublist, list.lists])

  useEffect(() => {
    get<TListPage>(`/api/lists/${list._id}`)
      .then((response) => {
        setFullSublist(response.data.lists.map(({ title, _id }) => ({ title, _id })))
      })
  }, [list._id])

  return (
    <Card className={list.isDeleted ? '--deleted' : ''}>
      {list.isDeleted &&
        <Button
          icon="pi pi-undo"
          className="p-button-rounded p-button-warning --undo"
          onClick={() => deleteOrRestore('lists', list._id)}
        />
      }

      <Button
        icon="pi pi-times"
        className="p-button-rounded p-button-secondary --delete"
        onClick={() => deleteOrRestore('lists', list._id)}
      />

      <Button
        label={list.title}
        onClick={() => {
          fetchLists()
          setListId(list._id)
        }}
        className="p-button-outlined"
      />

      {list.lists.map((sublist) => (
        <ListSingleSublist
          key={sublist._id}
          listId={list._id}
          sublistPlaceholder={sublistPlaceholder}
          sublistOptions={sublistOptions}
          sublistLength={list.lists.length}
          currentValue={sublist}
          setSublist={setSublist}
          removeSublist={removeSublist}
        />
      ))}

      <Button
        disabled={list.lists.length === fullSublist.length}
        className="p-button-sm p-button-secondary p-button-outlined"
        icon="pi pi-plus"
        onClick={() => addSublist(list._id)}
      />
    </Card>
  )
}