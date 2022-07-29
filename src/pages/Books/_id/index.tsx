import { observer } from 'mobx-react-lite';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BookView } from '../../../components/BookView/BookView';
import { ItemActions } from '../../../components/ItemActions/ItemActions';
import { Preloader } from '../../../components/Preloader/Preloader';
import { useApi } from '../../../hooks/useApi';
import { useConfirm } from '../../../hooks/useConfirm';
import { useLocale } from '../../../hooks/useLocale';
import { useToast } from '../../../hooks/useToast';
import { TBookPage } from '../../../types/Books';
import { TCategoryAuthor, TCategoryBasic, TCategoryMin } from '../../../types/Categories';
import { TBookList } from '../../../types/List';

export const Book = observer(() => {
  const params = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const location = useLocation()
  const { get, patch, remove } = useApi()
  const { text } = useLocale()
  const [isBookFetched, setIsBookFetched] = useState(false)
  const [book, setBook] = useReducer(
    (book: TBookPage, payload: Partial<TBookPage>) => ({ ...book, ...payload }),
    {} as TBookPage
  )
  const [updates, setUpdates] = useState<Set<keyof TBookPage | string>>(new Set())
  const { callConfirmation } = useConfirm()

  const fetchBook = () => {
    get<TBookPage>(`/api/books/${params.id}`)
      .then((response) => setBook(response.data))
      .then(_ => setIsBookFetched(true))
      .catch((error) => console.dir(error))
  }

  const saveBook = () => {
    const payload = Array.from(updates).reduce<Partial<TBookPage>>((acc, next) => {
      // @ts-ignore
      acc[next] = book[next]
      return acc
    }, {})

    patch<{ isSuccess: true }>(`/api/books/${params.id}`, payload)
      .then(_ => toast.current?.show({
        severity: 'success',
        summary: text('success'),
        detail: text('book.successSaving'),
        life: 5000
      }))
      .catch((error) => console.dir(error))
  }

  const deleteBook = () => {
    remove(`/api/books/${params.id}`)
      .then(_ => {
        toast.current?.show({
          severity: 'success',
          summary: text('success'),
          detail: text('book.successDeleted'),
          life: 5000
        })
        navigate('/books', { replace: true })
      })
      .catch((error) => console.dir(error))
  }

  const draftingOrPublishing = () => {
    setBook({ isDraft: !book.isDraft })
    setUpdates(new Set(updates.add('isDraft')))
  }

  const setAuthor = (value: TCategoryAuthor, _id: string | null) => {
    if (book.authors.some(({ author }) => author._id === value._id)) {
      toast.current?.show({
        severity: 'warn',
        summary: text('error'),
        detail: text('authors.alreadyExist'),
        life: 5000
      })
      return false
    }

    setBook({
      authors: _id ?
        book.authors.map((el) => (
          el._id === _id ? { ...el, author: value } : el
        )) :
        [
          ...book.authors,
          {
            author: value,
            role: '',
            _id: value._id,
            isNew: true
          }
        ]
    })
    setUpdates(new Set(updates.add('authors')))
  }

  const setPublisher = (value: TCategoryBasic, _id: string | null) => {
    if (book.publishers.some(({ publisher }) => publisher._id === value._id)) {
      toast.current?.show({
        severity: 'warn',
        summary: text('error'),
        detail: text('publishers.alreadyExist'),
        life: 5000
      })
      return false
    }

    setBook({
      publishers: _id ?
        book.publishers.map((el) => (
          el._id === _id ? { ...el, publisher: value } : el
        )) :
        [
          ...book.publishers,
          {
            _id: value._id,
            city: '',
            code: '',
            publisher: value,
            isNew: true
          }
        ]
    })
    setUpdates(new Set(updates.add('publishers')))
  }

  const setGenre = (value: TCategoryBasic, _id?: string) => {
    if (book.genres.some((el) => el._id === value._id)) {
      toast.current?.show({
        severity: 'warn',
        summary: text('error'),
        detail: text('genres.alreadyExist'),
        life: 5000
      })
      return false
    }

    setBook({
      genres: _id ?
        book.genres.map((el) => (
          el._id === _id ? { ...value } : el
        )) :
        [
          ...book.genres,
          { ...value, isNew: true }
        ]
    })
    setUpdates(new Set(updates.add('genres')))
  }

  const setAuthorRole = (value: string, _id: string) => {
    setBook({
      authors: book.authors.map((el) => (
        el.author._id === _id ? { ...el, role: value } : el
      ))
    })
    setUpdates(new Set(updates.add('authors')))
  }

  const setStatus = (key: string, value?: Date | Date[]) => {
    setBook({
      status: {
        ...book.status,
        [key]: !value || Array.isArray(value) ? null : value.toISOString()
      }
    })
    setUpdates(new Set(updates.add('status')))
  }

  const deleteOrRestore = (key: 'authors' | 'publishers' | 'genres' | 'lists', _id: string) => {
    setBook({
      [key]: book[key]?.map((el) => (
        el._id === _id ? { ...el, isDeleted: !el.isDeleted } : el
      ))
    })
    setUpdates(new Set(updates.add(key)))
  }

  const deleteOrRestoreSeries = () => {
    setBook({
      series: book.series && {
        ...book.series,
        isDeleted: !book.series?.isDeleted
      }
    })
    setUpdates(new Set(updates.add('series')))
  }

  const setPublisherMetadata = (_id: string, key: string, value: string) => {
    setBook({
      publishers: book.publishers.map((el) => (
        el.publisher._id === _id ? { ...el, [key]: value } : el
      ))
    })
    setUpdates(new Set(updates.add('publishers')))
  }

  const setFieldValue = (value: string | number | null, key: string) => {
    setBook({ [key]: value })
    setUpdates(new Set(updates.add(key)))
  }

  const setList = (value: TBookList, _id: string | null) => {
    if (book.lists?.some(({ _id }) => _id === value._id)) {
      toast.current?.show({
        severity: 'warn',
        summary: text('error'),
        detail: text('lists.alreadyExist'),
        life: 5000
      })
      return false
    }

    setBook({
      lists: _id ?
        book.lists.map((el) => (
          el._id === _id ? { ...value } : el
        )) :
        [
          ...book.lists,
          { ...value, isNew: true }
        ]
    })
    setUpdates(new Set(updates.add('lists')))
  }

  const setSublist = (listId: string, oldValue: string, newValue: TCategoryMin) => {
    setBook({
      lists: book.lists.map((list) => (
        list._id !== listId
          ? list
          : {
            ...list,
            lists: list.lists.map((sublist) => (
              sublist._id !== oldValue
                ? sublist
                : newValue
            ))
          }
      ))
    })
    setUpdates(new Set(updates.add('lists')))
  }

  const addSublist = (listId: string) => {
    setBook({
      lists: book.lists.map((list) => (
        list._id !== listId
          ? list
          : {
            ...list,
            lists: [...list.lists, { _id: String(list.lists.length), title: '' }]
          }
      ))
    })
    setUpdates(new Set(updates.add('lists')))
  }

  const removeSublist = (listId: string, sublistId: string) => {
    setBook({
      lists: book.lists.map((list) => (
        list._id !== listId
          ? list
          : {
            ...list,
            lists: list.lists.filter(({ _id }) => _id !== sublistId)
          }
      ))
    })
    setUpdates(new Set(updates.add('lists')))
  }

  const setRating = (value?: number | null) => {
    setBook({ rating: value || undefined })
    setUpdates(new Set(updates.add('rating')))
  }

  const setFileLink = (value?: string) => {
    setBook({ file: value })
    setUpdates(new Set(updates.add('file')))
  }

  const switchUnnecessaryState = () => {
    setBook({ accountability: !book.accountability })
    setUpdates(new Set(updates.add('accountability')))
  }

  const setSeries = (series: TCategoryBasic) => {
    setBook({ series })
    setUpdates(new Set(updates.add('series')))
  }

  const setEditorValue = (value: string, key: string) => {
    setBook({ [key]: value })
    setUpdates(new Set(updates.add(key)))
  }

  useEffect(() => {
    if (!location.pathname.includes('/edit') || !book._id) {
      setIsBookFetched(false)
      delete book.series
      fetchBook()
    }
  }, [location])

  return (
    <>
      {
        !isBookFetched ?
          <Preloader /> :
          <>
            <BookView
              book={book}
              isEditable={location.pathname.includes('/edit')}
              setRating={setRating}
              setFileLink={setFileLink}
              setReadingStartDate={(value) => setStatus('start', value)}
              setReadingFinishDate={(value) => setStatus('finish', value)}
              setAuthor={setAuthor}
              setAuthorRole={setAuthorRole}
              deleteOrRestore={deleteOrRestore}
              setPublisher={setPublisher}
              setPublisherMetadata={setPublisherMetadata}
              setGenre={setGenre}
              switchUnnecessaryState={switchUnnecessaryState}
              setSeries={setSeries}
              deleteOrRestoreSeries={deleteOrRestoreSeries}
              setFieldValue={setFieldValue}
              setList={setList}
              setSublist={setSublist}
              addSublist={addSublist}
              removeSublist={removeSublist}
              setEditorValue={setEditorValue}
            />

            <footer className="book__footer">
              <ItemActions
                isDraft={book.isDraft}
                isEditMode={location.pathname.includes('/edit')}
                saveEntity={saveBook}
                draftingOrPublishing={draftingOrPublishing}
                cancelEditingEntity={() => {
                  navigate(`/books/${params.id}`, { replace: true })
                }}
                editEntity={() => {
                  navigate(`/books/${params.id}/edit`, { replace: true })
                }}
                deleteEntity={(event) => callConfirmation(event, deleteBook)}
              />
            </footer>
          </>
      }
    </>
  )
})