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
import { usePageConfig } from '../../../hooks/usePageConfig';

export const Category = observer(({ slug }: TCategoriesIndexProps) => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  const { text } = useLocale()
  const { api: { getConfiguredEntity, saveEntity, deleteEntity } } = useApi()
  const [pageConfig] = usePageConfig({ pageKey: `category:${slug}` })
  const [isCategoryFetched, setIsCategoryFetched] = useState(false)
  const [category, setCategory] = useReducer(
    (category: TCategoryPage, payload: Partial<TCategoryPage>) => ({ ...category, ...payload }),
    {} as TCategoryPage
  )
  const [updates, setUpdates] = useState<Set<keyof TCategoryPage>>(new Set())
  const { callConfirmation } = useConfirm()

  const fetchCategory = () => {
    getConfiguredEntity(`${slug}/${params.id}`, pageConfig, slug, setCategory)
      .then(() => setIsCategoryFetched(true))
      .catch((error) => console.error(error))
  }

  const patchedPayload = () => (
    Array.from(updates).reduce<Partial<TCategoryPage>>((acc, next) => {
      // @ts-ignore
      acc[next] = typeof category[next] === 'string' ? category[next].replace(/\s+/g, ' ').trim() : category[next]
      return acc
    }, {})
  )

  const saveCategory = () => {
    if (updates.size === 0) {
      toast.current?.show({
        severity: 'warn',
        summary: text('error'),
        detail: text('page.unchanged'),
        life: 5000
      })

      return false
    }

    patchCategory({ isDraft: category.isDraft }, `${slug}.successSaving`)
      .then((response?: { isSuccess: true } | void) => (
        response?.isSuccess && setUpdates((prevState) => (
          new Set([...prevState].filter(() => false))
        ))
      ))
  }

  const draftingOrPublishing = () => {
    if (!category.isDraft && category.books.docs?.length > 0) {
      toast.current?.show({
        severity: 'error',
        summary: text('error'),
        detail: text('common.draftImpossible'),
        life: 5000
      })

      return false
    }

    patchCategory({ isDraft: !category.isDraft }, category.isDraft ? 'common.successPublished' : 'common.successDrafted')
      .then((response?: { isSuccess: true } | void) => (
        response?.isSuccess && setCategory({ ...category, isDraft: !category.isDraft })
      ))
  }

  const patchCategory = async (
    requiredPayload: Pick<TCategoryPage, 'isDraft'>,
    message: string
  ) => {
    const payload = { ...patchedPayload(), ...requiredPayload }
    return saveEntity<{ isSuccess: true }, typeof payload>(`${slug}/${params.id}`, payload)
      .then((data) => {
        toast.current?.show({
          severity: 'success',
          summary: text('success'),
          detail: text(message),
          life: 5000
        })
        return data
      })
  }

  const deleteCategory = () => {
    if (category.books.docs?.length > 0) {
      toast.current?.show({
        severity: 'error',
        summary: text('error'),
        detail: text('common.removingImpossible'),
        life: 5000
      })

      return false
    }

    deleteEntity(`${slug}/${params.id}`)
      .then(() => navigate(`/${slug}`, { replace: true }))
  }

  const updateCategoryTitle = (value: string) => {
    setCategory({ ...category, title: value })
    setUpdates((prevState) => new Set([...prevState, 'title']))
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