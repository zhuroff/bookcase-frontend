import { observer } from 'mobx-react-lite';
import { useLocale } from '../../hooks/useLocale';
import { TBooksListItem } from '../../types/Books';
import { TCategoryAuthor, TCategoryMin } from '../../types/Categories';
import { TListContent } from '../../types/List';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Link } from 'react-router-dom';

type TListPageSectionRowProps = {
  content: TListContent
  isTarget: boolean
  isEditable: boolean
}

export const ListPageSectionRow = observer(({
  content,
  isTarget,
  isEditable
}: TListPageSectionRowProps) => {
  const { text } = useLocale()

  const bookCoverUrl = (cover?: string) => (
    String(process.env.REACT_APP_SERVER_HOST) +
    (cover
      ? cover
      : '/uploads/covers/placeholder.jpg')
  )

  const authorsAbbreviated = (authors: TCategoryAuthor[]) => (
    authors.reduce<TCategoryMin[]>((acc, author) => {
      acc.push({
        _id: author._id,
        title: author.lastName
          ? `${author.lastName}, ${author.firstName[0]}. ${author.patronymicName?.[0] ? author.patronymicName[0] + '.' : ''}`
          : author.title
      })

      return acc
    }, [])
  )

  const BookCell = (book: TBooksListItem) => (
    <div className="table__body-book">
      <Link to={`/books/${book._id}`}>
        <img
          className="table__body-book__cover"
          src={bookCoverUrl(book.coverImage)}
        />
      </Link>
      <div className="table__body-book__content">
        <Link to={`/books/${book._id}`}>
          <div className="table__body-book__title">
            {book.title}
            {book.subtitle ? `. ${book.subtitle}` : ''}
          </div>
        </Link>
        <div className="table__body-book__authors">
          {authorsAbbreviated(book.authors).map(({ _id, title }) => (
            <Link
              key={_id}
              to={`/authors/${_id}`}
            >{title}</Link>
          ))}
        </div>
        <div className="table__body-book__output">
          {text('book.params.publicationYear')}: {book.publicationYear}. {text('book.pagesFull')}: {book.pages}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <tr
        className={`table__body-row ${content.book.status?.finish ? '--read' : ''}`}
        style={isTarget ? { backgroundColor: 'var(--gray-800)' } : {}}
      >
        <td className="table__body-cell">{BookCell(content.book)}</td>
        <td
          className="table__body-cell"
          style={{ width: '250px' }}
        >
          <div className="table__body-comment">
            {!isEditable ?
              content.comment :
              <InputTextarea
                rows={1}
                value={content.comment || ''}
                autoResize
                onInput={(e) => console.log(e.currentTarget.value)}
              />
            }
          </div>
        </td>
        {isEditable &&
          <td
            className="table__body-cell"
            style={{ width: '110px' }}
          >
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <Button
                label={text('common.replace')}
                className="p-button p-component p-button-sm p-button-outlined"
              />
              <Button
                label={text('common.delete')}
                className="p-button p-component p-button-sm p-button-outlined p-button-danger"
              />
            </div>
          </td>
        }
      </tr>
    </>
  )
})