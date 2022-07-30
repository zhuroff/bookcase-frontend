import { observer } from 'mobx-react-lite';
import { InputText } from 'primereact/inputtext';
import { useLocale } from '../../hooks/useLocale';

type TBookFileProps = {
  isEditable: boolean
  fileLink?: string
  setFileLink: (value: string) => void
}

export const BookFile = observer(({ isEditable, fileLink, setFileLink }: TBookFileProps) => {
  const { text } = useLocale()

  return (
    <>
      {
        isEditable ?
          <InputText
            value={fileLink || ''}
            onInput={(e) => setFileLink(e.currentTarget.value)}
            placeholder={text('book.placeholders.fileLink')}
            className="no-border"
          /> :
          fileLink &&
          <a
            className="p-button p-component p-button-outlined book__file-link"
            href={fileLink}
            target="_blank"
          >{text('book.fileButton')}</a>
      }
    </>
  )
})