import { observer } from 'mobx-react-lite';
import { InputTextarea } from 'primereact/inputtextarea';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { TCategoryAuthorPage } from '../../types/Categories';
import { BookCard } from '../BookCard/BookCard';
import { LinksList } from '../LinksList/LinksList';
import './AuthorView.scss';

type TAuthorViewProps = {
  author: TCategoryAuthorPage
  isEditable?: boolean
  updateAuthorName: (value: string, key: keyof TCategoryAuthorPage) => void
  appendLinkRow: () => void
  removeLinkRow: (index: number) => void
  setLinkParam: (value: string, index: number, key: string) => void
}

export const AuthorView = observer(({
  author,
  isEditable,
  updateAuthorName,
  appendLinkRow,
  removeLinkRow,
  setLinkParam
}: TAuthorViewProps) => {
  const { text } = useLocale()
  const navigate = useNavigate()
  const [authorContent, setAuthorContent] = useState(author)

  useEffect(() => {
    setAuthorContent(author)
  }, [author])

  return (
    <div className="view author">
      <aside className="author__aside">
        {(isEditable || (!isEditable && authorContent.lastName)) &&
          <InputTextarea
            rows={1}
            value={authorContent.lastName}
            autoResize
            disabled={!isEditable}
            placeholder={text('authors.lastNamePlaceholder')}
            className={`book__title ${isEditable && '--editable'}`}
            onInput={(e) => updateAuthorName(e.currentTarget.value, 'lastName')}
          />
        }

        {(isEditable || (!isEditable && authorContent.firstName)) &&
          <InputTextarea
            rows={1}
            value={authorContent.firstName || ''}
            autoResize
            disabled={!isEditable}
            placeholder={text('authors.firstNamePlaceholder')}
            className="book__subtitle"
            onInput={(e) => updateAuthorName(e.currentTarget.value, 'firstName')}
          />
        }

        {(isEditable || (!isEditable && authorContent.patronymicName)) &&
          <InputTextarea
            rows={1}
            value={authorContent.patronymicName || ''}
            autoResize
            disabled={!isEditable}
            placeholder={text('authors.patronymicNamePlaceholder')}
            className="book__subtitle"
            onInput={(e) => updateAuthorName(e.currentTarget.value, 'patronymicName')}
          />
        }
      </aside>

      <main className="author__main">
        <h2 className="view__heading"><span>{text('common.books')}</span></h2>
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

        {(isEditable || (!isEditable && authorContent.links)) &&
          <LinksList
            links={authorContent.links}
            isEditable={isEditable}
            appendLinkRow={appendLinkRow}
            removeLinkRow={removeLinkRow}
            setLinkParam={setLinkParam}
          />
        }
      </main>
    </div>
  )
})