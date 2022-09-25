import { observer } from 'mobx-react-lite';
import { useEffect, useReducer } from 'react';
import { TNote } from '../../../types/Note';
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';

type TNoteProps = {
  externalNote?: TNote
  transmitNoteValue?: <T, >(key: keyof TNote, value: T) => void
}

export const Note = observer(({
  externalNote,
  transmitNoteValue
}: TNoteProps) => {
  const [note, setNote] = useReducer(
    (note: TNote, payload: Partial<TNote>) => ({ ...note, ...payload }),
    {} as TNote
  )

  const updateNoteValue = <T,>(key: keyof TNote, value: T) => {
    if (transmitNoteValue) {
      transmitNoteValue(key, value)
    } else {
      setNote({ [key]: value })
    }
  }

  useEffect(() => {
    if (externalNote) {
      setNote(externalNote)
    }
  }, [externalNote])

  return (
    <>
      <div className="mb-3">
        <InputText
          value={note.title}
          placeholder="Note title"
          onChange={(e) => updateNoteValue<string>('title', e.target.value)}
        />
      </div>

      <div className="field">
        <Editor
          value={note.text}
          onTextChange={(e) => updateNoteValue<string>('text', String(e.htmlValue))}
        />
      </div>
    </>
  )
})