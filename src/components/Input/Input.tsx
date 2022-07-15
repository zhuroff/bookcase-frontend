import { FormEvent, HTMLInputTypeAttribute } from 'react';
import { observer } from 'mobx-react-lite';
import { InputText } from 'primereact/inputtext';
import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox';
import './Input.scss';

type InputSize = 'small' | 'medium' | 'large'
type InputValues = string | boolean | number

type InputProps = {
  name: string
  type: HTMLInputTypeAttribute
  value: InputValues
  size?: InputSize
  placeholder?: string
  noBorder?: true
  onInput?: (event: FormEvent<HTMLInputElement>) => void
  setValue?: (event: CheckboxChangeParams) => void
}

export const Input = observer(({
  name,
  type,
  value,
  size,
  placeholder,
  noBorder,
  onInput,
  setValue
}: InputProps) => {
  const textInputs = ['text', 'password', 'email', 'search', 'number']

  return (
    <>
      {
        textInputs.includes(type) &&
        <InputText
          type={type}
          value={String(value)}
          className={`${size ?? 'medium'} ${noBorder ? 'no-border' : ''}`}
          onInput={onInput}
          placeholder={placeholder}
        />
      }

      {
        type === 'checkbox' &&
        <div className="col-12 field-checkbox">
          <Checkbox inputId={name} value={value} onChange={setValue} checked={value} />
          {placeholder && <label htmlFor={name} className="p-checkbox-label">{placeholder}</label>}
        </div>
      }
    </>
  )
})