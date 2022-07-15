import { observer } from 'mobx-react-lite';
import { Card } from 'primereact/card';
import { Input } from '../Input/Input';

type TSimpleParamProps = {
  isEditable: boolean
  content: string | number
  title: string
  setSimpleParam: (value: string) => void
}

export const SimpleParam = observer(({
  isEditable,
  content,
  title,
  setSimpleParam
}: TSimpleParamProps) => {
  return (
    <Card>
      <span className="card__link-primary">{title}</span>
      <em className="card__link-secondary">
        {isEditable ?
          <Input
            name="publicationYear"
            value={content}
            type={typeof content}
            size="small"
            noBorder={true}
            onInput={(event) => setSimpleParam(event.currentTarget.value)}
          /> :
          <>{content}</>
        }
      </em>
    </Card>
  )
})