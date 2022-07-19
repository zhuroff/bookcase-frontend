import { observer } from 'mobx-react-lite';
import { InputTextarea } from 'primereact/inputtextarea';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { TCategorySeriesPage } from '../../types/Categories';
import { BookCard } from '../BookCard/BookCard';

type TSeriesViewProps = {
  series: TCategorySeriesPage
  isEditable?: boolean
  updateSeriesTitle: (value: string) => void
}

export const SeriesView = observer(({
  series,
  isEditable,
  updateSeriesTitle
}: TSeriesViewProps) => {
  const { text } = useLocale()
  const navigate = useNavigate()
  const [seriesContent, setSeriesContent] = useState(series)

  useEffect(() => {
    setSeriesContent(series)
  }, [series])

  return (
    <div className="view author">
      <aside className="author__aside">
        <InputTextarea
          rows={1}
          value={seriesContent.title}
          autoResize
          disabled={!isEditable}
          placeholder={text('authors.lastNamePlaceholder')}
          className={`book__title ${isEditable && '--editable'}`}
          onInput={(e) => updateSeriesTitle(e.currentTarget.value)}
        />
      </aside>

      <main className="author__main">
        <h2 className="view__heading"><span>{text('common.books')}</span></h2>
        {seriesContent.books.length &&
          <ul className="cards">
            {
              seriesContent.books.map((book) => (
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
                  onClick={() => navigate(`/books/${book._id}`)}
                />
              ))
            }
          </ul>
        }
      </main>
    </div>
  )
})