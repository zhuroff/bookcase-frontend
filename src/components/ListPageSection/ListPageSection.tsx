import { observer } from 'mobx-react-lite';
import { TListSection } from '../../types/List';
import { ListPageSectionRow } from './ListPageSectionRow';
import { useLocale } from '../../hooks/useLocale';
import { Button } from 'primereact/button';
import './ListPageSection.scss';

type TListPageViewProps = {
  section: TListSection
  targetBook: string | null
  isEditable: boolean
}

export const ListPageSection = observer(({
  section,
  targetBook,
  isEditable
}: TListPageViewProps) => {
  const { text } = useLocale()

  return (
    <>
      <header className="section__heading">
        <h3
          className="section__subtitle"
          style={{
            position: 'sticky',
            top: '104px',
            backgroundColor: 'var(--surface-b)',
            zIndex: 1000,
            paddingBottom: '1rem'
          }}
        >{section.title}</h3>
        {isEditable &&
          <Button
            label={text('common.add')}
            className="p-button p-component p-button-sm p-button-outlined"
          />
        }
      </header>

      <table className="table">
        <thead className="table__header">
          <tr className="table__header-row">
            <th className="table__header-cell">{text('common.book')}</th>
            <th className="table__header-cell">{text('common.comment')}</th>
            {isEditable &&
              <th className="table__header-cell">{text('common.actions')}</th>
            }
          </tr>
        </thead>
        <tbody className="table__body">
          {
            section.contents.map((item) => (
              <ListPageSectionRow
                key={item._id}
                content={item}
                isTarget={targetBook === item.book._id}
                isEditable={isEditable}
              />
            ))
          }
        </tbody>
      </table>
    </>
  )
})