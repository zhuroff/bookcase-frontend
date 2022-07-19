import { observer } from 'mobx-react-lite';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ItemActions } from '../../../components/ItemActions/ItemActions';
import { Preloader } from '../../../components/Preloader/Preloader';
import { CategoryView } from '../../../components/CategoryView/CategoryView';
import { useApi } from '../../../hooks/useApi';
import { useConfirm } from '../../../hooks/useConfirm';
import { useLocale } from '../../../hooks/useLocale';
import { useToast } from '../../../hooks/useToast';
import { TCategoryPage } from '../../../types/Categories';
import { TCategoriesIndexProps } from '../../../types/Common';

export const Category = observer(({ slug }: TCategoriesIndexProps) => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  const { text } = useLocale()
  const { get, patch, remove } = useApi()
  const [isCategoryFetched, setIsCategoryFetched] = useState(false)
  const [category, setCategory] = useReducer(
    (category: TCategoryPage, payload: Partial<TCategoryPage>) => ({ ...category, ...payload }),
    {} as TCategoryPage
  )
  const [updates, setUpdates] = useState<Set<keyof TCategoryPage>>(new Set())
  const { callConfirmation } = useConfirm()

  const fetchCategory = () => {
    get<TCategoryPage>(`/api/${slug}/${params.id}`)
      .then((response) => setCategory(response.data))
      .then(_ => setIsCategoryFetched(true))
      .catch((error) => console.dir(error))
  }

  const updateCategoryTitle = (value: string) => {
    setCategory({ ...category, title: value })
    setUpdates(new Set(updates.add('title')))
  }

  const saveCategory = () => {
    const payload = Array.from(updates).reduce<Partial<TCategoryPage>>((acc, next) => {
      // @ts-ignore
      acc[next] = category[next]
      return acc
    }, {})

    patch<{ isSuccess: true }>(`/api/${slug}/${params.id}`, payload)
      .then(_ => toast.current?.show({
        severity: 'success',
        summary: text('success'),
        detail: text(`${slug}.successSaving`),
        life: 5000
      }))
      .catch((error) => console.dir(error))
  }

  const deleteCategory = () => {

  }

  const draftingOrPublishing = () => {

  }

  useEffect(() => {
    if (!location.pathname.includes('/edit') || !category._id) {
      setIsCategoryFetched(false)
      fetchCategory()
    }
  }, [location])

  return (
    <>
      {!isCategoryFetched ?
        <Preloader /> :
        <>
          <CategoryView
            category={category}
            isEditable={location.pathname.includes('/edit')}
            updateCategoryTitle={updateCategoryTitle}
          />

          <footer className="book__footer">
            <ItemActions
              isDraft={category.isDraft}
              isEditMode={location.pathname.includes('/edit')}
              saveEntity={saveCategory}
              draftingOrPublishing={draftingOrPublishing}
              cancelEditingEntity={() => {
                navigate(`/${slug}/${params.id}`, { replace: true })
              }}
              editEntity={() => {
                navigate(`/${slug}/${params.id}/edit`, { replace: true })
              }}
              deleteEntity={(event) => callConfirmation(event, deleteCategory)}
            />
          </footer>
        </>
      }
    </>
  )
})