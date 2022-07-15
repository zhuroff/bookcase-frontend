import { observer } from 'mobx-react-lite';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';

type TDropdownParamProps = {
  isEditable: boolean
  title: string
  selected: string
  selectedTitle: string
  options: { value: string; label: string }[]
  setDropdownParam: (value: string) => void
}

export const DropdownParam = observer(({
  isEditable,
  title,
  selected,
  selectedTitle,
  options,
  setDropdownParam
}: TDropdownParamProps) => {
  return (
    <Card>
      <span className="card__link-primary">{title}</span>
      {
        isEditable ?
          <Dropdown
            options={options}
            value={selected}
            onChange={(e) => setDropdownParam(e.value)}
          /> :
          <em className="card__link-secondary">{selectedTitle}</em>
      }
    </Card>
  )
})