import { Card } from 'primereact/card';
import { InputSwitch } from 'primereact/inputswitch';
import { useLocale } from '../../hooks/useLocale';

type TAccountabilityFieldProps = {
  isEditable: boolean
  isAccounted: boolean
  switchUnnecessaryState: () => void
}

export const AccountabilityField = ({
  isEditable,
  isAccounted,
  switchUnnecessaryState
}: TAccountabilityFieldProps) => {
  const { text } = useLocale()

  return (
    <Card>
      <span className="card__link-primary">{text('book.params.unnecessary.title')}</span>
      <em className="card__link-secondary">
        {isEditable &&
          <InputSwitch
            checked={isAccounted}
            onChange={switchUnnecessaryState}
          />
        }
        {text<string[]>('book.params.unnecessary.values')[Number(isAccounted)]}
      </em>
    </Card>
  )
}
