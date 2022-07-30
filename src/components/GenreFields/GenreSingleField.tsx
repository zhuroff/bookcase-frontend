import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { TCategoryBasic } from '../../types/Categories'

type TGenreSingleFieldProps = {
  genre: TCategoryBasic
  isDeleted?: boolean
  fetchGenres: () => void
  setGenreId: () => void
  deleteOrRestore: (key: 'genres') => void
}

export const GenreSingleField = ({
  genre,
  isDeleted,
  fetchGenres,
  setGenreId,
  deleteOrRestore
}: TGenreSingleFieldProps) => {
  return (
    <Card className={isDeleted ? '--deleted' : ''}>
      {isDeleted &&
        <Button
          icon="pi pi-undo"
          className="p-button-rounded p-button-warning --undo"
          onClick={() => deleteOrRestore('genres')}
        />
      }

      <Button
        icon="pi pi-times"
        className="p-button-rounded p-button-secondary --delete"
        onClick={() => deleteOrRestore('genres')}
      />

      <Button
        label={genre.title}
        onClick={() => {
          fetchGenres()
          setGenreId()
        }}
        className="p-button-outlined"
      />
    </Card>
  )
}