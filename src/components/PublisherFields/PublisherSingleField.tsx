import { observer } from 'mobx-react-lite'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { useLocale } from '../../hooks/useLocale'
import { TCategoryBasic } from '../../types/Categories'

type TPublisherSingleFieldProps = {
  publisher: TCategoryBasic
  city: string
  code: string
  isDeleted?: boolean
  fetchPublishers: () => void
  setPublisherId: () => void
  deleteOrRestore: (key: 'publishers') => void
  setPublisherMetadata: (publisherId: string, key: string, value: string) => void
}

export const PublisherSingleField = observer(({
  publisher,
  city,
  code,
  isDeleted,
  fetchPublishers,
  setPublisherId,
  deleteOrRestore,
  setPublisherMetadata
}: TPublisherSingleFieldProps) => {
  const { text } = useLocale()

  return (
    <Card className={isDeleted ? '--deleted' : ''}>
      {isDeleted &&
        <Button
          icon="pi pi-undo"
          className="p-button-rounded p-button-warning --undo"
          onClick={() => deleteOrRestore('publishers')}
        />
      }

      <Button
        icon="pi pi-times"
        className="p-button-rounded p-button-secondary --delete"
        onClick={() => deleteOrRestore('publishers')}
      />

      <Button
        label={publisher.title}
        onClick={() => {
          fetchPublishers()
          setPublisherId()
        }}
        className="p-button-outlined"
      />

      <div className="p-inputwrapper p-noborder">
        <InputText
          value={city || ''}
          placeholder={text('book.placeholders.publisherCity')}
          onInput={(e) => setPublisherMetadata(publisher._id, 'city', e.currentTarget.value)}
        />
      </div>

      <div className="p-inputwrapper p-noborder">
        <InputText
          value={code || ''}
          placeholder={text('book.placeholders.publisherCode')}
          onInput={(e) => setPublisherMetadata(publisher._id, 'code', e.currentTarget.value)}
        />
      </div>
    </Card>
  )
})