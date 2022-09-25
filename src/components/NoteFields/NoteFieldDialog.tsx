import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Note } from '../../pages/Notes/_id'
import { useLocale } from '../../hooks/useLocale';
import { TNote } from '../../types/Note';
import { useReducer } from 'react';

type TNoteFieldDialogProps = {
  note?: TNote
  onHide: () => void
}

export const NoteFieldDialog = ({
  note,
  onHide
}: TNoteFieldDialogProps) => {
  const { text } = useLocale()
  const [dialogNote, setDialogNote] = useReducer(
    (note: TNote, payload: Partial<TNote>) => ({ ...note, ...payload }),
    {} as TNote
  )

  const setNoteValue = <T,>(key: keyof TNote, value: T) => {
    setDialogNote({ [key]: value })
  }

  const saveNote = () => {
    console.log(dialogNote)
  }

  const NoteDialogFooter = () => (
    <footer>
      <Button
        label={text('common.save')}
        className="p-button-outlined"
        onClick={saveNote}
      />
    </footer>
  )

  return (
    <Dialog
      header={text('notes.modal.heading')}
      visible={true}
      style={{ width: '50vw' }}
      onHide={onHide}
      footer={<NoteDialogFooter />}
    >
      <Note
        externalNote={dialogNote}
        transmitNoteValue={(key, value) => setNoteValue(key, value)}
      />
    </Dialog>
  )
}