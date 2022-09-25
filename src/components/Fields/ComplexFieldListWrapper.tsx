import { observer } from 'mobx-react-lite';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { ReactNode, useEffect, useState, useReducer } from 'react';
import { useApi } from '../../hooks/useApi';
import { useCreator } from '../../hooks/useCreator';
import { useLocale } from '../../hooks/useLocale';
import { usePageConfig } from '../../hooks/usePageConfig';
import { useSearch } from '../../hooks/useSearch';
import { TCategoriesResponse, TCategoryBasic, TCategoryKeys } from '../../types/Categories';
import { TPaginatorResponse } from '../../types/Common';
import { CategoryForm } from '../CategoryView/CategoryForm';
import { ModalCategoryList } from '../ModalCategoryList/ModalCategoryList';
import { ModalHeader } from '../ModalHeader/ModalHeader';

type TComplexFieldListProps<T> = {
  categoryKey: TCategoryKeys
  isEditable: boolean
  selectCategory: (key: TCategoryKeys, value: T, id: string | null) => void
  children?: ReactNode
}

export const ComplexFieldListWrapper = observer(<T extends TCategoryBasic>({
  categoryKey,
  isEditable,
  selectCategory,
  children
}: TComplexFieldListProps<T>) => {
  const { api: { getPaginatedList }, pagination } = useApi()
  const { text } = useLocale()
  const [createEntity] = useCreator()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: categoryKey, isModal: true })
  const [searchQuery, setSearchQuery, searchResults, setSearchResults] = useSearch<T[]>({ collection: categoryKey })
  const [categories, setCategories] = useState<T[]>([])
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null)
  const [creatingMode, setCreatingMode] = useState(false)

  const [category, updateCategoryParam] = useReducer(
    (category: T, payload: Partial<T>) => ({ ...category, ...payload }),
    { isDraft: false } as T
  )

  const fetchCategories = () => {
    getPaginatedList<T>(categoryKey, pageConfig, setCategories)
  }

  const createNewCategory = async () => {
    const response = await createEntity<T>(categoryKey, category, false)

    if (response) {
      selectCategory(categoryKey, response, currentCategoryId)
      setCreatingMode(false)
      setCategories([])
    }
  }

  useEffect(() => {
    if (searchResults?.length) {
      setCategories(searchResults)
    }
  }, [searchResults])

  useEffect(() => {
    if (categories.length > 0 && !searchQuery.length) {
      fetchCategories()
    }
  }, [pageConfig])

  useEffect(() => {
    if (categories.length === 0) {
      setSearchQuery('')
      setSearchResults(null)

      if (pageConfig) {
        setPageConfig({ ...pageConfig, page: 0 })
      }
    }
  }, [categories])

  useEffect(() => {
    if (!searchQuery.length && categories.length) {
      fetchCategories()
    }
  }, [searchQuery])

  return (
    <>
      <div className="book__repeater">
        {children}
        {isEditable &&
          <Card>
            <div
              className="p-card-add"
              onClick={() => {
                fetchCategories()
                setCurrentCategoryId(null)
              }}
            >
              <span className="pi pi-plus"></span>
            </div>
          </Card>
        }
      </div>

      <Dialog
        header={!creatingMode && <ModalHeader
          searchName="modalSearch"
          searchQuery={searchQuery}
          isCreatable={true}
          pagePagination={pagination}
          setSearchQuery={(value) => setSearchQuery(value)}
          createEntity={() => setCreatingMode(true)}
          switchPagination={(page) => {
            if (pageConfig) {
              setPageConfig({ ...pageConfig, page })
            }
          }}
        />}
        visible={categories.length > 0}
        draggable={false}
        style={{ width: '50vw' }}
        onHide={() => setCategories([])}
      >
        {!creatingMode ?
          <ModalCategoryList<TCategoryBasic>
            entities={categories}
            heading={text(`common.${categoryKey}`)}
            slug="publishers"
            selectEntity={(category) => selectCategory(categoryKey, category as T, currentCategoryId)}
            clearEntities={() => setCategories([])}
          /> :
          <div className="p-dialog-form">
            <CategoryForm
              isEditable={true}
              title={category.title}
              withSaveButton={true}
              updateCategoryTitle={(title) => updateCategoryParam({ title } as Partial<T>)}
              saveCategory={createNewCategory}
              cancelCreating={() => setCreatingMode(false)}
            />
          </div>
        }
      </Dialog>
    </>
  )
})
