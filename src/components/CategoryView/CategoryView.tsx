import { observer } from 'mobx-react-lite';
import { InputTextarea } from 'primereact/inputtextarea';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { TCategoryPage } from '../../types/Categories';
import { BookCard } from '../BookCard/BookCard';

type TCategoryViewProps = {
  category: TCategoryPage
  isEditable?: boolean
  updateCategoryTitle: (value: string) => void
}

export const CategoryView = observer(({
  category,
  isEditable,
  updateCategoryTitle
}: TCategoryViewProps) => {
  const { text } = useLocale()
  const navigate = useNavigate()
  const [categoryContent, setCategoryContent] = useState(category)

  useEffect(() => {
    setCategoryContent(category)
  }, [category])

  return (
    <div className="view author">
      <aside className="author__aside">
        <InputTextarea
          rows={1}
          value={categoryContent.title}
          autoResize
          disabled={!isEditable}
          placeholder={text('authors.lastNamePlaceholder')}
          className={`book__title ${isEditable && '--editable'}`}
          onInput={(e) => updateCategoryTitle(e.currentTarget.value)}
        />
      </aside>

      <main className="author__main">
        <h2 className="view__heading"><span>{text('common.books')}</span></h2>
        {categoryContent.books.length &&
          <ul className="cards">
            {
              categoryContent.books.map((book) => (
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