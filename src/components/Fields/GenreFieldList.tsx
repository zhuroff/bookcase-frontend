import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { TCategoryBasic } from '../../types/Categories';
import { GenreFieldSingle } from './GenreFieldSingle';

type TGenreFieldProps = {
  isEditable: boolean
  genres: TCategoryBasic[]
}

export const GenreFieldList = observer(({
  isEditable,
  genres
}: TGenreFieldProps) => {
  return (
    <>
      {
        genres.map((genre, _, genres) => (
          !isEditable ?
            <Link
              key={genre._id}
              to={`/genres/${genre._id}`}
              className="card__link"
            >
              <Card>
                <span className="card__link-primary">{genre.title}</span>
              </Card>
            </Link> : <h1>well</h1>
          // <GenreFieldSingle
          //   key={genre._id}
          //   genre={genre}
          //   isDeleted={genre.isDeleted}
          //   isUndeletable={genres.filter((el) => !el.isDeleted).length === 1}
          //   fetchGenres={fetchGenres}
          //   setGenreId={() => setCurrentGenreId(genre._id)}
          //   deleteOrRestore={(key) => deleteOrRestore(key, genre._id)}
          // />
        ))
      }
    </>
  )
})