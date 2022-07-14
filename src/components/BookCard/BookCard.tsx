import { observer } from 'mobx-react-lite';
import { BaseSyntheticEvent, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TBookStatus } from '../../types/Books';
import { TCategoryAuthor, TCategoryBasic } from '../../types/Categories';
import { useLocale } from '../../hooks/useLocale';
import { Card } from 'primereact/card'
import './BookCard.scss';

type BookCardProps = {
  route: string
  title: string
  status?: TBookStatus
  coverImage?: string
  authors: TCategoryAuthor[]
  genres: TCategoryBasic[]
  lists: TCategoryBasic[]
  accountability: boolean
  onClick: () => void
}

type AbbreviatedAuthors = {
  _id: string
  title: string
}

export const BookCard = observer(({
  route,
  title,
  status,
  coverImage,
  authors,
  genres,
  lists,
  accountability,
  onClick
}: BookCardProps) => {
  const { text } = useLocale()

  const bookCoverUrl = useMemo(() => (
    String(process.env.REACT_APP_SERVER_HOST) +
    (coverImage
      ? coverImage
      : '/uploads/covers/placeholder.jpg')
  ), [coverImage])

  const authorsAbbreviated = useMemo(() => (
    authors.reduce<AbbreviatedAuthors[]>((acc, author) => {
      acc.push({
        _id: author._id,
        title: author.lastName
          ? `${author.lastName}, ${author.firstName[0]}. ${author.patronymicName?.[0] ? author.patronymicName[0] + '.' : ''}`
          : author.title
      })

      return acc
    }, [])
  ), [authors])

  const onCardClick = (event: BaseSyntheticEvent) => {
    if (!event.target.closest('A')) {
      onClick()
    }
  }

  return (
    <Card>
      <div
        className={`card__wrapper ${!accountability && 'not-accounted'}`}
        onClick={onCardClick}
        title={!accountability ? text('book.params.unnecessary.tooltip') : ''}
      >
        {
          (status?.start && !status?.finish) && <i className="pi pi-clock card__status"></i>
        }
        {
          (status?.start && status?.finish) && <i className="pi pi-check-circle card__status"></i>
        }
        <Link
          to={`/books/${route}`}
          className='card__link'
        >
          <img
            src={bookCoverUrl}
            alt={title}
            className="card__cover"
          />
        </Link>

        <div className="card__content">
          <Link
            to={`/books/${route}`}
            className='card__title'
            title={title}
          >{title}</Link>

          <ul className="card__authors">
            {
              authorsAbbreviated.map(({ _id, title }) => (
                <li
                  key={_id}
                  className="card__row"
                >
                  <Link
                    to={`/authors/${_id}`}
                    className='card__row-author'
                  >{title}</Link>
                </li>
              ))
            }
          </ul>

          <div className="card__footer">
            <div
              className="card__tags"
              title={text('common.genres')}
            >
              {
                genres.map(({ _id, title }) => (
                  <Link
                    key={_id}
                    to={`/genres/${_id}`}
                    className='card__tags-link'
                  >{title}</Link>
                ))
              }
            </div>

            {
              lists.length > 0 &&
              <div
                className="card__tags"
                title={text('common.lists')}
              >
                {
                  lists.map(({ _id, title }) => (
                    <Link
                      key={_id}
                      to={`/lists/${_id}`}
                      className='card__tags-link'
                    >{title}</Link>
                  ))
                }
              </div>
            }
          </div>
        </div>
      </div>
    </Card>
  )
})
