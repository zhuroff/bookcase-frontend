import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { useLocale } from '../../hooks/useLocale';
import { TCategoryAuthor } from '../../types/Categories';

type TAuthorSingleFieldProps = {
  author: TCategoryAuthor
  role: string
  isDeleted?: boolean
  isUndeletable: boolean
  dropdownPlaceholder: string
  setAuthorId: () => void
  fetchAuthors: () => void
  deleteOrRestore: (key: 'authors') => void
  setAuthorRole: (value: string, _id: string) => void
}

export const AuthorSingleField = ({
  author,
  role,
  isDeleted,
  isUndeletable,
  dropdownPlaceholder,
  setAuthorId,
  fetchAuthors,
  deleteOrRestore,
  setAuthorRole
}: TAuthorSingleFieldProps) => {
  const { messages, currentLocale } = useLocale()

  const authorRoles = Object.entries(messages[currentLocale].messages.authors.roles)
    .reduce((acc, [key, value]) => {
      acc.push({ value: key, label: value })
      return acc
    }, [] as { value: string; label: string }[])

  return (
    <Card className={isDeleted ? '--deleted' : ''}>
      {isDeleted &&
        <Button
          icon="pi pi-undo"
          className="p-button-rounded p-button-warning --undo"
          onClick={() => deleteOrRestore('authors')}
        />
      }

      {!isUndeletable &&
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-secondary --delete"
          onClick={() => deleteOrRestore('authors')}
        />
      }

      <Button
        label={author.title}
        onClick={() => {
          fetchAuthors()
          setAuthorId()
        }}
        className="p-button-outlined"
      />

      <Dropdown
        options={authorRoles}
        value={role}
        placeholder={dropdownPlaceholder}
        onChange={(e) => setAuthorRole(e.value, author._id)}
      />
    </Card>
  )
}