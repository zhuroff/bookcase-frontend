import { observer } from 'mobx-react-lite';
import { useLocale } from '../../hooks/useLocale';
import { Input } from '../Input/Input';

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
          <Input
            name="fileLink"
            type="text"
            value={fileLink || ''}
            onInput={(e) => setFileLink(e.currentTarget.value)}
            placeholder={text('book.placeholders.fileLink')}
            noBorder={true}
            size="large"
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