import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { BookCard } from '../components/BookCard/BookCard';
import { Preloader } from '../components/Preloader/Preloader';
import { useApi } from '../hooks/useApi';
import { useLocale } from '../hooks/useLocale';
import { TBooksListItem } from '../types/Books';
import { observer } from 'mobx-react-lite';

export const Dashboard = observer(() => {
  const navigate = useNavigate()
  const { get, post } = useApi()
  const { text } = useLocale()
  const [readingBooksFetched, setReadingBooksFetched] = useState(false)
  const [readBooksFetched, setReadBooksFetched] = useState(false)
  const [readingBooks, setReadingBooks] = useState<TBooksListItem[]>([])
  const [readBooks, setReadBooks] = useState<TBooksListItem[]>([])
  const [readYear, setReadYear] = useState(new Date().getFullYear())

  const fetchReadingBooks = () => {
    get('/api/dashboard/reading-books')
      .then((response) => {
        setReadingBooks(response.data.docs)
        setReadingBooksFetched(true)
      })
      .catch((error) => console.dir(error))
  }

  const fetchReadBooks = () => {
    post('/api/dashboard/read-books', { year: readYear })
      .then((response) => {
        setReadBooks(response.data.docs)
        setReadBooksFetched(true)
      })
      .catch((error) => console.dir(error))
  }

  const openBookPage = (id: string) => {
    navigate(`/books/${id}`)
  }

  const totalPages = (books: TBooksListItem[]) => (
    books
      .reduce((acc, { pages }) => acc + pages, 0)
      .toLocaleString('ru-RU')
  )

  const yearsList = useMemo(() => {
    const readingStart = 2010
    const readingNow = new Date().getFullYear() + 1

    return Array.from(
      { length: readingNow - readingStart },
      (_, b) => {
        const year = b += readingStart
        return { label: year, value: year }
      }
    ).reverse()
  }, [])

  useEffect(() => {
    fetchReadingBooks()
  }, [])

  useEffect(() => {
    fetchReadBooks()
  }, [readYear])

  return (
    <>
      <header className="section__heading">
        <h2 className="section__title">{text('dashboard.readingBooks')}</h2>
      </header>
      <ul className="cards">
        {
          !readingBooksFetched
            ? <Preloader />
            : !readingBooks.length
              ? <li className="cards__empty">{text('common.emptySection')}</li>
              : readingBooks.map((book) => (
                <BookCard
                  key={book._id}
                  route={book._id}
                  title={book.title}
                  status={book.status}
                  coverImage={book.coverImage}
                  authors={book.authors}
                  genres={book.genres}
                  lists={book.lists}
                  accountability={book.accountability}
                  onClick={() => openBookPage(book._id)}
                />
              ))
        }
      </ul>

      <header className="section__heading">
        <h2 className="section__title">
          {text('dashboard.readBooks')} ({totalPages(readBooks)} {text('book.pagesReduced')})
        </h2>
        <Dropdown
          value={readYear}
          options={yearsList}
          onChange={(e: any) => setReadYear(e.value)}
        />
      </header>
      <ul className="cards">
        {
          !readBooksFetched
            ? <Preloader />
            : !readBooks.length
              ? <li className="cards__empty">{text('common.emptySection')}</li>
              : readBooks.map((book) => (
                <BookCard
                  key={book._id}
                  route={book._id}
                  title={book.title}
                  status={book.status}
                  coverImage={book.coverImage}
                  authors={book.authors}
                  genres={book.genres}
                  lists={book.lists}
                  accountability={book.accountability}
                  onClick={() => openBookPage(book._id)}
                />
              ))
        }
      </ul>
    </>
  )
})
