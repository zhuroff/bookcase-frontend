import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { TCategoryAuthorPage } from '../../types/Categories';
import { BookCard } from '../BookCard/BookCard';
import { LinksList } from '../LinksList/LinksList';
import { AuthorForm } from './AuthorForm';

type TAuthorViewProps = {
  author: TCategoryAuthorPage
  isEditable: boolean
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
  const navigate = useNavigate()
  const { text } = useLocale()
  const [authorContent, setAuthorContent] = useState(author)

  useEffect(() => {
    setAuthorContent(author)
  }, [author])

  return (
    <div className="view">
      <div>
        <AuthorForm
          isEditable={isEditable}
          firstName={authorContent.firstName}
          lastName={authorContent.lastName}
          patronymicName={authorContent.patronymicName}
          updateAuthorName={updateAuthorName}
        />
      </div>

      <div>
        <h2 className="view__heading"><span>{text('common.books')}</span></h2>
        {Boolean(authorContent.books.docs?.length) ?
          <ul className="cards">
            {
              authorContent.books.docs?.map((book) => (
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

        {(isEditable || (!isEditable && authorContent.links)) &&
          <LinksList
            links={authorContent.links}
            isEditable={isEditable}
            appendLinkRow={appendLinkRow}
            removeLinkRow={removeLinkRow}
            setLinkParam={setLinkParam}
          />
        }
      </div>
    </div>
  )
})