import { observer } from 'mobx-react-lite';
import { InputTextarea } from 'primereact/inputtextarea';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { TCategoryPublisherPage } from '../../types/Categories';
import { BookCard } from '../BookCard/BookCard';

type TPublisherViewProps = {
  publisher: TCategoryPublisherPage
  isEditable?: boolean
  updatePublisherTitle: (value: string) => void
}

export const PublisherView = observer(({
  publisher,
  isEditable,
  updatePublisherTitle
}: TPublisherViewProps) => {
  const { text } = useLocale()
  const navigate = useNavigate()
  const [publisherContent, setPublisherContent] = useState(publisher)

  useEffect(() => {
    setPublisherContent(publisher)
  }, [publisher])

  return (
    <div className="view author">
      <aside className="author__aside">
        <InputTextarea
          rows={1}
          value={publisherContent.title}
          autoResize
          disabled={!isEditable}
          placeholder={text('authors.lastNamePlaceholder')}
          className={`book__title ${isEditable && '--editable'}`}
          onInput={(e) => updatePublisherTitle(e.currentTarget.value)}
        />
      </aside>

      <main className="author__main">
        <h2 className="view__heading"><span>{text('common.books')}</span></h2>
        {publisherContent.books.length &&
          <ul className="cards">
            {
              publisherContent.books.map((book) => (
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