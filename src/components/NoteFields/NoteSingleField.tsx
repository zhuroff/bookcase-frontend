import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { TNote } from '../../types/Note'

type TNoteSingleFieldProps = {
  note: TNote
  isDeleted: boolean
  isUndeletable: boolean
  deleteOrRestore: (key: 'notes') => void
}

export const NoteSingleField = ({
  note,
  isDeleted,
  isUndeletable,
  deleteOrRestore
}: TNoteSingleFieldProps) => {


  return (
    <Card className={isDeleted ? '--deleted' : ''}>
      {isDeleted &&
        <Button
          icon="pi pi-undo"
          className="p-button-rounded p-button-warning --undo"
          onClick={() => deleteOrRestore('notes')}
        />
      }

      {!isUndeletable &&
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-secondary --delete"
          onClick={() => deleteOrRestore('notes')}
        />
      }

      {/* <Button
        label={note.title}
        onClick={() => {
          fetchNotes()
          setNoteId()
        }}
        className="p-button-outlined"
      /> */}
    </Card>
  )
}