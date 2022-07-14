import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { TBookPage } from '../../types/Books';
import { InputTextarea } from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';
import { Fieldset } from 'primereact/fieldset';
import { CoverUploader } from '../ImageUploader/CoverUploader';
import { BookStatus } from '../BookStatus/BookStatus';
import { BookFile } from '../BookFile/BookFile';
import { useLocale } from '../../hooks/useLocale';
import { AuthorField } from '../AuthorField/AuthorField';
import { TCategoryAuthor, TCategoryBasic } from '../../types/Categories';
import { PublisherField } from '../PublisherField/PublisherField';
import './BookView.scss';
import { GenreField } from '../GenreField/GenreField';
import { ParamUnnecessary } from '../ParamFields/ParamUnnecessary';
import { SeriesField } from '../SeriesField/SeriesField';

type TBookViewProps = {
  book: TBookPage
  isEditable?: boolean
  setReadingStartDate: (value: Date | Date[] | undefined) => void
  setReadingFinishDate: (value: Date | Date[] | undefined) => void
  setRating: (value: number | null | undefined) => void
  setFileLink: (value: string | undefined) => void
  setAuthor: (value: TCategoryAuthor, _id?: string) => void
  setAuthorRole: (value: string, _id: string) => void
  deleteOrRestoreAuthor: (_id: string, isDeleted: boolean) => void
  setPublisher: (value: TCategoryBasic, _id?: string) => void
  deleteOrRestorePublisher: (_id: string, isDeleted: boolean) => void
  setPublisherMetadata: (_id: string, key: string, value: string) => void
  deleteOrRestoreGenre: (_id: string, isDeleted: boolean) => void
  setGenre: (value: TCategoryBasic, _id?: string) => void
  switchUnnecessaryState: () => void
  setSeries: (value: TCategoryBasic) => void
  deleteOrRestoreSeries: () => void
}

export const BookView = observer(({
  book,
  isEditable = true,
  setReadingStartDate,
  setReadingFinishDate,
  setRating,
  setFileLink,
  setAuthor,
  setAuthorRole,
  deleteOrRestoreAuthor,
  setPublisher,
  deleteOrRestorePublisher,
  setPublisherMetadata,
  deleteOrRestoreGenre,
  setGenre,
  switchUnnecessaryState,
  setSeries,
  deleteOrRestoreSeries
}: TBookViewProps) => {
  const { text } = useLocale()
  const [bookContent, setBookContent] = useState(book)

  useEffect(() => {
    setBookContent(book)
  }, [book])

  return (
    <div className="view book">
      <aside className="book__aside">
        <CoverUploader
          image={bookContent.coverImage}
          isDisabled={!isEditable}
        />
        <BookFile
          isEditable={isEditable}
          fileLink={bookContent.file}
          setFileLink={setFileLink}
        />
        <BookStatus
          isEditable={isEditable}
          status={bookContent.status}
          setReadingStartDate={setReadingStartDate}
          setReadingFinishDate={setReadingFinishDate}
        />
        {bookContent.status.finish &&
          <Rating
            className="book__rating"
            readOnly={!isEditable}
            value={bookContent.rating}
            onChange={(e) => setRating(e.value)}
          />
        }
      </aside>

      <main className="book__main">
        <InputTextarea
          rows={1}
          value={bookContent.title}
          autoResize
          disabled={!isEditable}
          placeholder={text('book.placeholders.title')}
          className={`book__title ${isEditable && '--editable'}`}
          onInput={(e) => setBookContent({
            ...bookContent,
            title: e.currentTarget.value
          })}
        />

        {
          (isEditable || (!isEditable && bookContent.subtitle)) &&
          <InputTextarea
            rows={1}
            value={bookContent.subtitle || ''}
            autoResize
            disabled={!isEditable}
            placeholder={text('book.placeholders.subtitle')}
            className="book__subtitle"
            onInput={(e) => setBookContent({
              ...bookContent,
              subtitle: e.currentTarget.value
            })}
          />
        }

        <Fieldset
          legend={text('common.authors')}
          toggleable
        >
          <div className="book__repeater">
            {
              book.authors.map((author, index, arr) => (
                <AuthorField
                  key={author._id}
                  isLast={index === arr.length - 1}
                  isEditable={isEditable}
                  content={author}
                  selectAuthor={(value, isAppend) => setAuthor(
                    value,
                    isAppend ? undefined : author._id
                  )}
                  setAuthorRole={(value) => setAuthorRole(value, author.author._id)}
                  deleteOrRestoreAuthor={deleteOrRestoreAuthor}
                />
              ))
            }
          </div>
        </Fieldset>

        <Fieldset
          legend={text('common.publishers')}
          toggleable
        >
          <div className="book__repeater">
            {
              book.publishers.map((publisher, index, arr) => (
                <PublisherField
                  key={publisher.publisher._id}
                  isLast={index === arr.length - 1}
                  isEditable={isEditable}
                  content={publisher}
                  deleteOrRestorePublisher={deleteOrRestorePublisher}
                  selectPublisher={(value, isAppend) => setPublisher(
                    value,
                    isAppend ? undefined : publisher._id
                  )}
                  setPublisherMetadata={setPublisherMetadata}
                />
              ))
            }
          </div>
        </Fieldset>

        <Fieldset
          legend={text('common.genres')}
          toggleable
        >
          <div className="book__repeater">
            {
              book.genres.map((genre, index, arr) => (
                <GenreField
                  key={genre._id}
                  isLast={index === arr.length - 1}
                  isEditable={isEditable}
                  content={genre}
                  deleteOrRestoreGenre={deleteOrRestoreGenre}
                  selectGenre={(value, isAppend) => setGenre(
                    value,
                    isAppend ? undefined : genre._id
                  )}
                />
              ))
            }
          </div>
        </Fieldset>

        <Fieldset
          legend={text('book.params.heading')}
          toggleable
        >
          <div className="book__repeater">
            <ParamUnnecessary
              isEditable={isEditable}
              isAccounted={bookContent.accountability}
              switchUnnecessaryState={switchUnnecessaryState}
            />

            <SeriesField
              isEditable={isEditable}
              content={bookContent.series}
              selectSeries={setSeries}
              deleteOrRestoreSeries={deleteOrRestoreSeries}
            />
          </div>
        </Fieldset>
      </main>
    </div>
  )
})
