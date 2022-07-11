import { Button } from 'primereact/button';
import { ReactNode } from 'react';
import { TPageConfig } from '../../types/Common';
import { useLocale } from '../../hooks/useLocale';

type TListActionsProps = {
  isDraft: boolean
  createEntity: () => void
  resetConfig: () => void
  updateConfig: (payload: Partial<TPageConfig>) => void
  children?: ReactNode
}

export const ListActions = ({
  isDraft,
  createEntity,
  resetConfig,
  updateConfig,
  children
}: TListActionsProps) => {
  const { text } = useLocale()

  return (
    <div className="actions">
      <Button
        className="p-button-sm p-button-outlined"
        label={text('common.create')}
        onClick={createEntity}
      />
      {children && children}
      <Button
        className={`p-button-sm p-button-secondary ${!isDraft && 'p-button-outlined'}`}
        icon="pi pi-ban"
        title={text('common.draftsOnly')}
        onClick={() => updateConfig({ isDraft: !isDraft })}
      />
      <Button
        className="p-button-sm p-button-secondary p-button-outlined"
        icon="pi pi-filter-slash"
        title={text('common.reset')}
        onClick={resetConfig}
      />
    </div>
  )
}
