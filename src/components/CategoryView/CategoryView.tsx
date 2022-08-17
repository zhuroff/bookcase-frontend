import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { TCategoryPage } from '../../types/Categories';
import { BookCard } from '../BookCard/BookCard';
import { CategoryForm } from './CategoryForm';

type TCategoryViewProps = {
  category: TCategoryPage
  isEditable: boolean
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
        <CategoryForm
          isEditable={isEditable}
          title={categoryContent.title}
          updateCategoryTitle={updateCategoryTitle}
        />
      </aside>

      <main className="author__main">
        <h2 className="view__heading"><span>{text('common.books')}</span></h2>
        {Boolean(categoryContent.books.length) ?
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
          </ul> :
          <div className="empty">{text('common.emptySection')}</div>
        }
      </main>
    </div>
  )
})