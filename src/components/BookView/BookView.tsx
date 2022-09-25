import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { TBookPage } from '../../types/Books';
import { InputTextarea } from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';
import { Fieldset } from 'primereact/fieldset';
import { CoverUploader } from '../CoverUploader/CoverUploader';
import { BookStatus } from '../BookStatus/BookStatus';
import { BookFile } from '../BookFile/BookFile';
import { useLocale } from '../../hooks/useLocale';
import { AuthorFields } from '../AuthorFields/AuthorFields';
import { TCategoryAuthor, TCategoryBasic, TCategoryKeys } from '../../types/Categories';
import { PublisherFields } from '../PublisherFields/PublisherFields';
// import { GenreFields } from '../GenreFields/GenreFields';
import { ListFields } from '../ListFields/ListFields';
import { AccountabilityField } from '../SimpleFields/AccountabilityField';
import { SeriesField } from '../SeriesField/SeriesField';
import { InputField } from '../SimpleFields/InputField';
import { DropdownField } from '../SimpleFields/DropdownField';
import { Editor } from 'primereact/editor';
import { TBookList } from '../../types/List';
import { NoteFields } from '../NoteFields/NoteFields';
import { TEntityBasic } from '../../types/Common';
import { ComplexFieldListWrapper } from '../Fields/ComplexFieldListWrapper';
import { GenreFieldList } from '../Fields/GenreFieldList';
import './BookView.scss';

type TBookViewProps = {
  book: TBookPage
  isEditable?: boolean
  uploadPreCover: (file?: File) => void
  setReadingStartDate: (value: Date | Date[] | undefined) => void
  setReadingFinishDate: (value: Date | Date[] | undefined) => void
  setRating: (value?: number | null) => void
  setFileLink: (value: string | undefined) => void
  setAuthor: (value: TCategoryAuthor, _id: string | null) => void
  setAuthorRole: (value: string, _id: string) => void
  deleteOrRestore: (key: 'authors' | 'publishers' | 'genres' | 'lists', _id: string) => void
  setPublisher: (value: TCategoryBasic, _id: string | null) => void
  setPublisherMetadata: (_id: string, key: string, value: string) => void
  setGenre: (value: TCategoryBasic, _id: string | null) => void
  switchUnnecessaryState: () => void
  setSeries: (value: TCategoryBasic) => void
  deleteOrRestoreSeries: () => void
  setFieldValue: (value: string | number | null, key: keyof TBookPage) => void
  setList: (value: TBookList, _id: string | null) => void
  setSublist: (listId: string, oldValue: string, newValue: TEntityBasic) => void
  addSublist: (listId: string) => void
  removeSublist: (listId: string, sublistId: string) => void
  selectCategory: (key: TCategoryKeys, value: TCategoryBasic, _id: string | null) => void
}

export const BookView = observer(({
  book,
  isEditable = true,
  uploadPreCover,
  setReadingStartDate,
  setReadingFinishDate,
  setRating,
  setFileLink,
  setAuthor,
  setAuthorRole,
  deleteOrRestore,
  setPublisher,
  setPublisherMetadata,
  setGenre,
  switchUnnecessaryState,
  setSeries,
  deleteOrRestoreSeries,
  setFieldValue,
  setList,
  setSublist,
  addSublist,
  removeSublist,
  selectCategory
}: TBookViewProps) => {
  const { text, messages, currentLocale } = useLocale()
  const [bookContent, setBookContent] = useState(book)

  const coverTypes = Object.entries(messages[currentLocale].messages.book.params.coverTypes)
    .reduce((acc, [key, value]) => {
      acc.push({ value: key, label: value })
      return acc
    }, [] as { value: string; label: string }[])

  const formatTypes = Object.entries(messages[currentLocale].messages.book.params.formatTypes)
    .reduce((acc, [key, value]) => {
      acc.push({ value: key, label: value })
      return acc
    }, [] as { value: string; label: string }[])

  useEffect(() => {
    setBookContent(book)
  }, [book])

  return (
    <div className="view book">
      <aside className="book__aside">
        <CoverUploader
          image={bookContent.coverImage}
          preloadedImage={bookContent.preCoverImage}
          isDisabled={!isEditable}
          uploadPreCover={uploadPreCover}
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
          onInput={(e) => setFieldValue(e.currentTarget.value, 'title')}
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
            onInput={(e) => setFieldValue(e.currentTarget.value, 'subtitle')}
          />
        }

        <Fieldset
          legend={text('common.authors')}
          toggleable
        >
          <AuthorFields
            isEditable={isEditable}
            content={book.authors}
            selectAuthor={setAuthor}
            setAuthorRole={setAuthorRole}
            deleteOrRestore={deleteOrRestore}
          />
        </Fieldset>

        <Fieldset
          legend={text('common.publishers')}
          toggleable
        >
          <PublisherFields
            isEditable={isEditable}
            content={book.publishers}
            deleteOrRestore={deleteOrRestore}
            selectPublisher={setPublisher}
            setPublisherMetadata={setPublisherMetadata}
          />
        </Fieldset>

        <Fieldset
          legend={text('common.genres')}
          toggleable
        >
          {/* <GenreFields
            isEditable={isEditable}
            content={book.genres}
            deleteOrRestore={deleteOrRestore}
            selectGenre={setGenre}
          /> */}
          <ComplexFieldListWrapper<TCategoryBasic>
            categoryKey="genres"
            isEditable={isEditable}
            selectCategory={selectCategory}
          >
            <GenreFieldList
              isEditable={isEditable}
              genres={book.genres}
            />
          </ComplexFieldListWrapper>
        </Fieldset>

        {(isEditable || book.lists?.length > 0) &&
          <Fieldset
            legend={text('common.lists')}
            toggleable
          >
            <ListFields
              isEditable={isEditable}
              content={book.lists}
              bookId={book._id}
              setSublist={setSublist}
              deleteOrRestore={deleteOrRestore}
              addSublist={addSublist}
              removeSublist={removeSublist}
              selectList={setList}
            />
          </Fieldset>
        }

        <Fieldset
          legend={text('book.params.heading')}
          toggleable
        >
          <div className="book__repeater">
            <AccountabilityField
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

            <InputField
              isEditable={isEditable}
              type="number"
              content={bookContent.publicationYear}
              title={text('book.params.publicationYear')}
              setFieldValue={(value) => setFieldValue(value, 'publicationYear')}
            />

            <InputField
              isEditable={isEditable}
              type="number"
              content={bookContent.pages}
              title={text('book.params.pages')}
              setFieldValue={(value) => setFieldValue(value, 'pages')}
            />

            <DropdownField
              isEditable={isEditable}
              options={coverTypes}
              selected={bookContent.coverType}
              selectedTitle={text(`book.params.coverTypes.${bookContent.coverType}`)}
              title={text('book.params.coverType')}
              setDropdownValue={(value) => setFieldValue(value, 'coverType')}
            />

            <DropdownField
              isEditable={isEditable}
              options={formatTypes}
              selected={bookContent.format}
              selectedTitle={text(`book.params.formatTypes.${bookContent.format}`)}
              title={text('book.params.formatType')}
              setDropdownValue={(value) => setFieldValue(value, 'format')}
            />
          </div>
        </Fieldset>

        <Fieldset
          legend={text('book.annotation')}
          toggleable
          className={!isEditable ? '--readonly' : ''}
        >
          <Editor
            value={bookContent.description}
            onTextChange={(e) => setFieldValue(String(e.htmlValue), 'description')} />
        </Fieldset>

        {(isEditable || bookContent.contents) &&
          <Fieldset
            legend={text('book.contentsTable')}
            toggleable
            className={!isEditable ? '--readonly' : ''}
          >
            <Editor
              value={bookContent.contents}
              onTextChange={(e) => setFieldValue(String(e.htmlValue), 'contents')} />
          </Fieldset>
        }

        {(isEditable || bookContent.summary) &&
          <Fieldset
            legend={text('book.summary')}
            toggleable
            className={!isEditable ? '--readonly' : ''}
          >
            <Editor
              value={bookContent.summary}
              onTextChange={(e) => setFieldValue(String(e.htmlValue), 'summary')} />
          </Fieldset>
        }

        {(isEditable || bookContent.notes?.length > 0) &&
          <Fieldset
            legend={text('notes.heading')}
            toggleable
            className={!isEditable ? '--readonly' : ''}
          >
            <NoteFields
              isEditable={isEditable}
              content={bookContent.notes}
            />
          </Fieldset>
        }
      </main>
    </div>
  )
})
