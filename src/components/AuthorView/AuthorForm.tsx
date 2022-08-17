import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { useLocale } from '../../hooks/useLocale';
import { TCategoryAuthorPage } from '../../types/Categories';

type TAuthorFormProps = {
  isEditable: boolean
  firstName: string
  lastName?: string
  patronymicName?: string
  withSaveButton?: true
  updateAuthorName: (value: string, key: keyof TCategoryAuthorPage) => void
  saveAuthor?: () => void
  cancelCreating?: () => void
}

export const AuthorForm = ({
  isEditable,
  firstName,
  lastName,
  patronymicName,
  withSaveButton,
  updateAuthorName,
  saveAuthor,
  cancelCreating
}: TAuthorFormProps) => {
  const { text } = useLocale()

  return (
    <>
      {(isEditable || (!isEditable && lastName)) &&
        <InputTextarea
          rows={1}
          value={lastName || ''}
          autoResize
          disabled={!isEditable}
          placeholder={text('authors.lastNamePlaceholder')}
          className={`book__title ${isEditable && '--editable'}`}
          onInput={(e) => updateAuthorName(e.currentTarget.value, 'lastName')}
        />
      }

      {(isEditable || (!isEditable && firstName)) &&
        <InputTextarea
          rows={1}
          value={firstName || ''}
          autoResize
          disabled={!isEditable}
          placeholder={text('authors.firstNamePlaceholder')}
          className="book__subtitle"
          onInput={(e) => updateAuthorName(e.currentTarget.value, 'firstName')}
        />
      }

      {(isEditable || (!isEditable && patronymicName)) &&
        <InputTextarea
          rows={1}
          value={patronymicName || ''}
          autoResize
          disabled={!isEditable}
          placeholder={text('authors.patronymicNamePlaceholder')}
          className="book__subtitle"
          onInput={(e) => updateAuthorName(e.currentTarget.value, 'patronymicName')}
        />
      }

      {withSaveButton &&
        <div className="p-tabview-nav">
          <Button
            label={text('common.create')}
            className="p-button-sm"
            style={{ marginRight: '0.5rem' }}
            onClick={saveAuthor}
          />
          <Button
            label={text('common.cancel')}
            className="p-button-sm p-button-outlined"
            onClick={cancelCreating}
          />
        </div>
      }
    </>
  )
}