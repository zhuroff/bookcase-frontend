import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { useLocale } from '../../hooks/useLocale';

type TItemActionsProps = {
  isDraft: boolean
  isEditMode: boolean
  editEntity: () => void
  saveEntity: () => void
  deleteEntity: () => void
  cancelEditingEntity: () => void
  draftingOrPublishing: () => void
}

export const ItemActions = observer(({
  isDraft,
  isEditMode,
  editEntity,
  saveEntity,
  deleteEntity,
  cancelEditingEntity,
  draftingOrPublishing
}: TItemActionsProps) => {
  const { text } = useLocale()

  return (
    <div className="actions">

      {isEditMode
        ? <>
          <Button
            className="p-button-sm p-button-outlined p-button-danger"
            style={{ marginRight: 'auto', marginLeft: 0 }}
            label={text('common.delete')}
            onClick={deleteEntity}
          />
          <Button
            className="p-button-sm p-button-outlined"
            label={text('common.save')}
            onClick={saveEntity}
          />
          <Button
            className="p-button-sm p-button-outlined"
            label={text('common.cancel')}
            onClick={cancelEditingEntity}
          />
          <Button
            className="p-button-sm p-button-outlined"
            label={text(isDraft ? 'common.toPublish' : 'common.toDraft')}
            onClick={draftingOrPublishing}
          />
        </>
        : <Button
          className="p-button-sm p-button-outlined"
          label={text('common.edit')}
          onClick={editEntity}
        />
      }
    </div>
  )
})
