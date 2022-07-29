import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { TCategoryBasic } from '../../types/Categories';

type TModalCategoryListProps<T> = {
  entities: T[],
  heading: string,
  slug: string
  selectEntity: (entity: T) => void
  clearEntities: () => void
}

export const ModalCategoryList = <T extends TCategoryBasic>({
  entities,
  heading,
  slug,
  selectEntity,
  clearEntities
}: TModalCategoryListProps<T>) => {
  const { text } = useLocale()

  return (
    <Card style={{ backgroundColor: 'var(--surface-100)' }}>
      <h3 className='p-card-heading'>{heading}</h3>
      <ul className='p-card-list'>
        {
          entities.map((entity) => (
            <li
              key={entity._id}
              className='p-card-item'
            >
              <Button
                className={'p-button-sm p-button-secondary p-button-outlined'}
                onClick={() => {
                  selectEntity(entity)
                  clearEntities()
                }}
              >{text('common.select')}</Button>

              <Link
                to={`/${slug}/${entity._id}`}
                className='p-card-link'
                style={{ marginLeft: '1rem' }}
              >{entity.title}</Link>
            </li>
          ))
        }
      </ul>
    </Card>
  )
}