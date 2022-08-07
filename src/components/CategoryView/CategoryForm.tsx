import { Button } from "primereact/button"
import { InputTextarea } from "primereact/inputtextarea"
import { useLocale } from "../../hooks/useLocale"

type TCategoryFormProps = {
  isEditable: boolean
  title: string
  withSaveButton?: true
  updateCategoryTitle: (value: string) => void
  saveCategory?: () => void
  cancelCreating?: () => void
}

export const CategoryForm = ({
  isEditable,
  title,
  withSaveButton,
  updateCategoryTitle,
  saveCategory,
  cancelCreating
}: TCategoryFormProps) => {
  const { text } = useLocale()

  return (
    <>
      <InputTextarea
        rows={1}
        value={title}
        autoResize
        disabled={!isEditable}
        placeholder={text('common.title')}
        className={`book__title ${isEditable && '--editable'}`}
        onInput={(e) => updateCategoryTitle(e.currentTarget.value)}
      />

      {withSaveButton &&
        <div className="p-tabview-nav">
          <Button
            label={text('common.create')}
            className="p-button-sm"
            style={{ marginRight: '0.5rem' }}
            onClick={saveCategory}
          />
          <Button
            label={text('common.cancel')}
            className="p-button-sm p-button-outlined"
            onClick={cancelCreating}
          />
        </div>
      }
    </>
  )
}