import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { useLocale } from '../../hooks/useLocale';
import { TEntityLink } from '../../types/Common';
import { Input } from '../Input/Input';
import './LinkList.scss';

type TLinksListProps = {
  links?: TEntityLink[]
  isEditable?: boolean
  appendLinkRow: () => void
  removeLinkRow: (index: number) => void
  setLinkParam: (value: string, index: number, key: string) => void
}

export const LinksList = observer(({
  links,
  isEditable,
  appendLinkRow,
  removeLinkRow,
  setLinkParam
}: TLinksListProps) => {
  const { text } = useLocale()

  return (
    <div className="links">
      <h2 className="view__heading">
        <span>{text('common.links.heading')}</span>
        {isEditable &&
          <Button
            className="p-button-sm p-button-secondary p-button-outlined"
            icon="pi pi-minus"
            title={text('common.create')}
            onClick={appendLinkRow}
          />
        }
      </h2>
      {
        !links?.length
          ? <div className="empty">{text('common.emptySection')}</div>
          : <ul className={`links__list ${!isEditable ? '--readonly' : ''}`}>
            {
              links.map((link, index) => (
                <li
                  className={`links__item ${isEditable ? '--editable' : '--readonly'}`}
                  key={link._id || index}
                >
                  {
                    isEditable ?
                      <>
                        <Input
                          type="text"
                          name={`title_${link._id || String(index)}`}
                          placeholder={text('common.links.title')}
                          value={link.title}
                          onInput={(event) => setLinkParam(event.currentTarget.value, index, 'title')}
                        />
                        <Input
                          type="text"
                          name={`url_${link._id || String(index)}`}
                          placeholder={text('common.links.url')}
                          value={link.url}
                          onInput={(event) => setLinkParam(event.currentTarget.value, index, 'url')}
                        />
                        <Button
                          className="p-button-sm p-button-secondary p-button-outlined"
                          icon="pi pi-times"
                          title={text('common.delete')}
                          onClick={() => removeLinkRow(index)}
                        />
                      </> :
                      <a href={link.url} target="_blank">{link.title}</a>
                  }
                </li>
              ))
            }
          </ul>
      }
    </div>
  )
})