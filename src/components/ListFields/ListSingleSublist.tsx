import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { TEntityBasic } from '../../types/Common';
import { Button } from 'primereact/button';

type TListSingleSublistProps = {
  listId: string
  sublistPlaceholder: string
  sublistLength: number
  sublistOptions: TEntityBasic[]
  currentValue: TEntityBasic
  setSublist: (listId: string, oldValue: string, newValue: TEntityBasic) => void
  removeSublist: (listId: string, sublistId: string) => void
}

export const ListSingleSublist = ({
  listId,
  sublistPlaceholder,
  sublistLength,
  sublistOptions,
  currentValue,
  setSublist,
  removeSublist
}: TListSingleSublistProps) => {
  const sublistValueTemplate = (_: any, props: DropdownProps) => (
    <>
      {props.value.title.length > 0 ?
        <span title={props.value.title}>{props.value.title}</span> :
        <span style={{ opacity: 0.5 }}>{sublistPlaceholder}</span>
      }
    </>
  )

  return (
    <div className="p-dropaction">
      <Dropdown
        options={sublistOptions}
        optionLabel="title"
        value={currentValue}
        valueTemplate={sublistValueTemplate}
        onChange={(e) => setSublist(listId, currentValue._id, e.value)}
      />
      {sublistLength > 1 &&
        <Button
          className="p-button-sm p-button-secondary p-button-outlined"
          icon="pi pi-times"
          onClick={() => removeSublist(listId, currentValue._id)}
        />
      }
    </div>
  )
}