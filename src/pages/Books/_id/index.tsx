import { observer } from 'mobx-react-lite';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BookView } from '../../../components/BookView/BookView';
import { ItemActions } from '../../../components/ItemActions/ItemActions';
import { Preloader } from '../../../components/Preloader/Preloader';
import { useApi } from '../../../hooks/useApi';
import { useLocale } from '../../../hooks/useLocale';
import { useToast } from '../../../hooks/useToast';
import { TBookPage } from '../../../types/Books';
import { TCategoryAuthor, TCategoryBasic } from '../../../types/Categories';

export const Book = observer(() => {
  const params = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const location = useLocation()
  const { get, post } = useApi()
  const { text } = useLocale()
  const [isBookFetched, setIsBookFetched] = useState(false)
  const [book, setBook] = useReducer(
    (book: TBookPage, payload: Partial<TBookPage>) => ({ ...book, ...payload }),
    {} as TBookPage
  )

  const fetchBook = () => {
    get<TBookPage>(`/api/books/${params.id}`)
      .then((response) => setBook(response.data))
      .then(_ => setIsBookFetched(true))
      .catch((error) => console.dir(error))
  }

  const saveBook = () => {
    post<{ isSuccess: true }>(`/api/books/${params.id}`, book)
      .then(_ => toast.current?.show({
        severity: 'success',
        summary: text('success'),
        detail: text('book.successSaving'),
        life: 5000
      }))
      .catch((error) => console.dir(error))
  }

  const deleteBook = () => {
    navigate('/books', { replace: true })
  }

  const draftingOrPublishing = () => {
    setBook({ isDraft: !book.isDraft })
  }

  const setAuthor = (value: TCategoryAuthor, _id?: string) => {
    if (book.authors.some((el) => el.author._id === value._id)) {
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
  }

  const setPublisher = (value: TCategoryBasic, _id?: string) => {
    if (book.publishers.some((el) => el.publisher._id === value._id)) {
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
  }

  const setAuthorRole = (value: string, _id: string) => {
    setBook({
      authors: book.authors.map((el) => (
        el.author._id === _id ? { ...el, role: value } : el
      ))
    })
  }

  const setStatus = (key: string, value?: Date | Date[]) => {
    setBook({
      status: {
        ...book.status,
        [key]: !value || Array.isArray(value) ? null : value.toISOString()
      }
    })
  }

  const deleteOrRestoreAuthor = (_id: string, value: boolean) => {
    setBook({
      authors: book.authors.map((el) => (
        el._id === _id ? { ...el, isDeleted: value } : el
      ))
    })
  }

  const deleteOrRestorePublisher = (_id: string, value: boolean) => {
    setBook({
      publishers: book.publishers.map((el) => (
        el._id === _id ? { ...el, isDeleted: value } : el
      ))
    })
  }

  const deleteOrRestoreGenre = (_id: string, value: boolean) => {
    setBook({
      genres: book.genres.map((el) => (
        el._id === _id ? { ...el, isDeleted: value } : el
      ))
    })
  }

  const setPublisherMetadata = (_id: string, key: string, value: string) => {
    setBook({
      publishers: book.publishers.map((el) => (
        el._id === _id ? { ...el, [key]: value } : el
      ))
    })
  }

  useEffect(() => {
    if (!location.pathname.includes('/edit') || !book._id) {
      setIsBookFetched(false)
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
              isEditable={params.edit !== undefined}
              setRating={(value) => setBook({ rating: value || undefined })}
              setFileLink={(value) => setBook({ file: value })}
              setReadingStartDate={(value) => setStatus('start', value)}
              setReadingFinishDate={(value) => setStatus('finish', value)}
              setAuthor={setAuthor}
              setAuthorRole={setAuthorRole}
              deleteOrRestoreAuthor={deleteOrRestoreAuthor}
              setPublisher={setPublisher}
              deleteOrRestorePublisher={deleteOrRestorePublisher}
              setPublisherMetadata={setPublisherMetadata}
              deleteOrRestoreGenre={deleteOrRestoreGenre}
              setGenre={setGenre}
              switchUnnecessaryState={() => setBook({ accountability: !book.accountability })}
            />

            <footer className="book__footer">
              <ItemActions
                isDraft={book.isDraft}
                isEditMode={params.edit !== undefined}
                editEntity={() => navigate(`/books/${params.id}/edit`, { replace: true })}
                saveEntity={saveBook}
                deleteEntity={deleteBook}
                cancelEditingEntity={() => navigate(`/books/${params.id}`, { replace: true })}
                draftingOrPublishing={draftingOrPublishing}
              />
            </footer>
          </>
      }
    </>
  )
})