import { observer } from 'mobx-react-lite';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { idb } from '../../../idb'
// import { ConfirmDialog } from 'primereact/confirmdialog';
import { BookView } from '../../../components/BookView/BookView';
import { ItemActions } from '../../../components/ItemActions/ItemActions';
import { Preloader } from '../../../components/Preloader/Preloader';
import { useApi } from '../../../hooks/useApi';
import { useConfirm } from '../../../hooks/useConfirm';
import { useLocale } from '../../../hooks/useLocale';
import { useToast } from '../../../hooks/useToast';
import { TBookPage } from '../../../types/Books';
import { TBookList } from '../../../types/List';
import { TCategoryAuthor, TCategoryBasic, TCategoryKeys } from '../../../types/Categories';
import { TEntityBasic } from '../../../types/Common';
// import { Collection, IndexableType } from 'dexie';

export const Book = observer(({ _id }: { _id?: string }) => {
  const params = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const location = useLocation()
  // const { get, post, patch, remove } = useApi()
  const { api: { getEntity, saveEntity, deleteEntity, uploadFile } } = useApi()
  const { text } = useLocale()
  const { callConfirmation } = useConfirm()
  // const [localDraft, setLocalDraft] = useState<Collection<TBookPage, IndexableType>>()
  const [isBookFetched, setIsBookFetched] = useState(false)
  const [updates, setUpdates] = useState<Set<keyof TBookPage>>(new Set())
  const [book, setBook] = useReducer(
    (book: TBookPage, payload: Partial<TBookPage>) => ({ ...book, ...payload }),
    {} as TBookPage
  )

  const fetchBook = () => {
    // extractLocalDraft(null)
    getEntity<TBookPage>(`books/${_id || params.id}`)
      .then((data) => {
        setBook(data)
        setIsBookFetched(true)
      })
      .catch((error) => console.error(error))
  }

  const saveBook = () => {
    if (updates.size === 0) {
      toast.current?.show({
        severity: 'warn',
        summary: text('error'),
        detail: text('page.unchanged'),
        life: 5000
      })

      return false
    }

    const payload = Array.from(updates).reduce<Partial<TBookPage>>((acc, next) => {
      // @ts-ignore
      acc[next] = typeof book[next] === 'string' ? book[next].replace(/\s+/g, ' ').trim() : book[next]
      return acc
    }, {})

    saveEntity<{ isSuccess: true }, typeof payload>(`books/${params.id}`, payload)
      .then(() => {
        toast.current?.show({
          severity: 'success',
          summary: text('success'),
          detail: text('book.successSaving'),
          life: 5000
        })
        setUpdates((prevState) => new Set([...prevState].filter(() => false)))
      })
      .catch((error) => console.error(error))
  }

  const deleteBook = () => {
    deleteEntity(`books/${params.id}`)
      .then(() => navigate('/books', { replace: true }))
  }

  const uploadPreCover = (file?: File) => {
    if (!file) return false

    uploadFile<Partial<TBookPage>>(`books/${book._id}/precover?folder=covers`, 'preCoverImage', file)
      .then((data) => {
        if (data) {
          setBook({ preCoverImage: data.preCoverImage })
          setUpdates((prevState) => new Set([...prevState, 'preCoverImage']))
        }
      })
  }

  const draftingOrPublishing = () => {
    setBook({ isDraft: !book.isDraft })
    setUpdates((prevState) => new Set([...prevState, 'isDraft']))
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
          el._id === _id ? { ...el, author: value, isChanged: true } : el
        )) :
        [
          ...book.authors,
          {
            author: value,
            role: '',
            _id: value._id,
            isAdded: true
          }
        ]
    })
    setUpdates((prevState) => new Set([...prevState, 'authors']))
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
            isAdded: true
          }
        ]
    })
    setUpdates((prevState) => new Set([...prevState, 'publishers']))
  }

  const setGenre = (value: TCategoryBasic, _id: string | null) => {
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
          { ...value, isAdded: true }
        ]
    })
    setUpdates((prevState) => new Set([...prevState, 'genres']))
  }

  const selectCategory = <T extends TCategoryBasic>(key: TCategoryKeys, value: T, _id: string | null) => {
    console.log(key, value, _id)
  }

  const setAuthorRole = (value: string, _id: string) => {
    setBook({
      authors: book.authors.map((el) => (
        el.author._id === _id ? { ...el, role: value } : el
      ))
    })
    setUpdates((prevState) => new Set([...prevState, 'authors']))
  }

  const setStatus = (key: string, value?: Date | Date[]) => {
    setBook({
      status: {
        ...book.status,
        [key]: !value || Array.isArray(value) ? null : value.toISOString()
      }
    })
    setUpdates((prevState) => new Set([...prevState, 'status']))
  }

  const deleteOrRestore = (key: 'authors' | 'publishers' | 'genres' | 'lists', _id: string) => {
    setBook({
      [key]: book[key]?.map((el) => (
        el._id === _id ? { ...el, isDeleted: !el.isDeleted } : el
      ))
    })
    setUpdates((prevState) => new Set([...prevState, key]))
  }

  const deleteOrRestoreSeries = () => {
    setBook({
      series: {
        ...book.series,
        isDeleted: !book.series.isDeleted
      }
    })
    setUpdates((prevState) => new Set([...prevState, 'series']))
  }

  const setFieldValue = (value: string | number | null, key: keyof TBookPage) => {
    setBook({ [key]: value })
    setUpdates((prevState) => new Set([...prevState, key]))
  }

  const setPublisherMetadata = (_id: string, key: string, value: string) => {
    setBook({
      publishers: book.publishers.map((el) => (
        el.publisher._id === _id ? { ...el, [key]: value } : el
      ))
    })
    setUpdates((prevState) => new Set([...prevState, 'publishers']))
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
          { ...value, isAdded: true }
        ]
    })
    setUpdates((prevState) => new Set([...prevState, 'lists']))
  }

  const setSublist = (listId: string, oldValue: string, newValue: TEntityBasic) => {
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
    setUpdates((prevState) => new Set([...prevState, 'lists']))
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
    setUpdates((prevState) => new Set([...prevState, 'lists']))
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
    setUpdates((prevState) => new Set([...prevState, 'lists']))
  }

  const setRating = (value?: number | null) => {
    setBook({ rating: value || undefined })
    setUpdates((prevState) => new Set([...prevState, 'rating']))
  }

  const setFileLink = (value?: string) => {
    setBook({ file: value })
    setUpdates((prevState) => new Set([...prevState, 'file']))
  }

  const switchUnnecessaryState = () => {
    setBook({ accountability: !book.accountability })
    setUpdates((prevState) => new Set([...prevState, 'accountability']))
  }

  const setSeries = (series: TCategoryBasic) => {
    setBook({ series })
    setUpdates((prevState) => new Set([...prevState, 'series']))
  }

  // const restoreFromDraft = () => {
  // if (localDraft) {
  //   setBook(JSON.parse(localDraft))
  //   setIsBookFetched(true)
  //   extractLocalDraft(null)
  // }
  // }

  // const removeDraftAndFetchBook = () => {
  //   fetchBook()
  // }

  // useEffect(() => {
  //   if (location.pathname.includes('/edit') && updates.size > 0) {
  //     idb.books.update(book._id, book)
  //   }
  // }, [book])

  useEffect(() => {
    if (location.pathname.includes('/edit') && updates.size > 0) {
      saveBook()
    }
  }, [book.isDraft])

  // useEffect(() => {
  //   if (!location.pathname.includes('/edit')) {
  //     setIsBookFetched(false)
  //     fetchBook()
  //   } else {
  //     idb.books.get(String(book._id))
  //       .then((response) => console.log(response))
  //       .catch((error) => console.dir(error))

  //     // if (bookDraft) {
  //     //   // setLocalDraft(bookDraft)
  //     // } else {
  //     //   fetchBook()
  //     // }
  //   }
  // }, [location])

  // if (localDraft) {
  //   return (
  //     <ConfirmDialog
  //       visible={true}
  //       header={text('page.restoreFromDraft.heading')}
  //       message={text('page.restoreFromDraft.message')}
  //       acceptLabel={text('common.yes')}
  //       rejectLabel={text('common.no')}
  //       icon="pi pi-question-circle"
  //       accept={restoreFromDraft}
  //       reject={removeDraftAndFetchBook}
  //     />
  //   )
  // }

  // TODO: Revome after initializing Dexie
  useEffect(() => {
    fetchBook()
  }, [])

  return (
    <>
      {
        !isBookFetched ?
          <Preloader /> :
          <>
            <BookView
              book={book}
              isEditable={location.pathname.includes('/edit') && location.pathname.includes('/books')}
              uploadPreCover={uploadPreCover}
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
              selectCategory={selectCategory}
            />

            {location.pathname.includes('/books') &&
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
            }
          </>
      }
    </>
  )
})