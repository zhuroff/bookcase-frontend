import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { TCategoryAuthorPage } from '../../types/Categories';
import { BookCard } from '../BookCard/BookCard';

type TAuthorViewProps = {
  author: TCategoryAuthorPage
}

export const AuthorView = observer(({
  author
}: TAuthorViewProps) => {
  const { text } = useLocale()
  const navigate = useNavigate()
  const [authorContent, setAuthorContent] = useState(author)

  useEffect(() => {
    setAuthorContent(author)
  }, [author])

  return (
    <>
      <div className="author">
        <aside className="author__aside">
          {authorContent.title}
        </aside>
        {authorContent.books.length &&
          <ul className="cards">
            {
              authorContent.books.map((book) => (
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
      </div>
    </>
  )
})