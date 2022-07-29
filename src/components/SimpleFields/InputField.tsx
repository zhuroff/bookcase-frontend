import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

type TInputFieldProps = {
  isEditable: boolean
  content: string | number
  type: 'text' | 'number'
  title: string
  setFieldValue: (value: string | number | null) => void
}

export const InputField = ({
  isEditable,
  content,
  type,
  title,
  setFieldValue
}: TInputFieldProps) => {
  return (
    <Card>
      <span className="card__link-primary">{title}</span>
      <em className="card__link-secondary">
        {isEditable ?
          <>
            {type === 'text' ?
              <InputText
                value={content}
                onInput={(event) => setFieldValue(event.currentTarget.value)}
                className="p-noborder"
              /> :
              <InputNumber
                value={Number(content) || null}
                onChange={(event) => setFieldValue(event.value)}
                className="p-noborder"
              />
            }
          </> :
          <>{content}</>
        }
      </em>
    </Card>
  )
}