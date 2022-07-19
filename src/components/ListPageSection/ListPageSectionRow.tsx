import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useLocale } from '../../hooks/useLocale';
import { TBooksListItem } from '../../types/Books';
import { TCategoryAuthor, TCategoryMin } from '../../types/Categories';
import { TListContent } from '../../types/List';

type TListPageSectionRowProps = {
  content: TListContent
}

export const ListPageSectionRow = observer(({
  content
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

  const BookCell = (book?: TBooksListItem) => (
    !book ?
      <span className="--deleted">{text('common.deleted')}</span> :
      <div className="table__body-book">
        <img className="table__body-book__cover" src={bookCoverUrl(book.coverImage)} />
        <div className="table__body-book__content">
          <div className="table__body-book__title">
            {book.title}
            {book.subtitle ? `. ${book.subtitle}` : ''}
          </div>
          <div className="table__body-book__authors">
            {authorsAbbreviated(book.authors).map(({ title }) => (
              <>{title}</>
            ))}
          </div>
          <div className="table__body-book__output">
            {text('book.params.publicationYear')}: {book.publicationYear}. {text('book.pagesFull')}: {book.pages}
          </div>
        </div>
      </div>
  )

  return (
    <tr className={`table__body-row ${content.book?.status?.finish ? '--read' : ''}`}>
      <td className="table__body-cell">{BookCell(content.book)}</td>
      <td className="table__body-cell">{content.comment}</td>
    </tr>
  )
})