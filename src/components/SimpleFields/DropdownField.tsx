import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';

type TDropdownFieldProps = {
  isEditable: boolean
  title: string
  selected: string
  selectedTitle: string
  options: { value: string; label: string }[]
  setDropdownValue: (value: string) => void
}

export const DropdownField = ({
  isEditable,
  title,
  selected,
  selectedTitle,
  options,
  setDropdownValue
}: TDropdownFieldProps) => {
  return (
    <Card>
      <span className="card__link-primary">{title}</span>
      {
        isEditable ?
          <Dropdown
            options={options}
            value={selected}
            onChange={(e) => setDropdownValue(e.value)}
          /> :
          <em className="card__link-secondary">{selectedTitle}</em>
      }
    </Card>
  )
}