import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Card } from 'primereact/card';
import { TNote } from '../../types/Note';
import { NoteFieldDialog } from './NoteFieldDialog'

type TNoteFieldsProps = {
  isEditable: boolean
  content: TNote[]
}

export const NoteFields = observer(({
  isEditable,
  content
}: TNoteFieldsProps) => {
  const [isCardDialogActive, setCardDialogState] = useState(false)
  const [selectedNote, setSelectedNote] = useState<TNote>()
  console.log(content)

  return (
    <>
      <div className="book__repeater">
        {isEditable &&
          <Card>
            <div
              className="p-card-add"
              onClick={() => setCardDialogState(true)}
            >
              <span className="pi pi-plus"></span>
            </div>
          </Card>
        }
      </div>

      {isCardDialogActive &&
        <NoteFieldDialog
          note={selectedNote}
          onHide={() => setCardDialogState(false)}
        />
      }
    </>
  )
})
