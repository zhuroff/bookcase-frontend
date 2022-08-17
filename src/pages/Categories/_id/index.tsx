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
import { EntityError, TCategoriesIndexProps } from '../../../types/Common';

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
      .then(() => setIsCategoryFetched(true))
      .catch((error) => console.dir(error))
  }

  const patchedPayload = () => (
    Array.from(updates).reduce<Partial<TCategoryPage>>((acc, next) => {
      // @ts-ignore
      acc[next] = category[next].replace(/\s+/g, ' ').trim()
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
    if (!category.isDraft && category.books.length > 0) {
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
    return await patch<{ isSuccess: true }>(
      `/api/${slug}/${params.id}`,
      { ...patchedPayload(), ...requiredPayload }
    )
      .then((response) => {
        toast.current?.show({
          severity: 'success',
          summary: text('success'),
          detail: text(message),
          life: 5000
        })
        return response.data
      })
      .catch((error: EntityError[]) => {
        error.forEach((err) => {
          toast.current?.show({
            severity: 'error',
            summary: text('error'),
            detail: text(err.msg),
            life: 5000
          })
        })
      })
  }

  const deleteCategory = () => {
    if (category.books.length > 0) {
      toast.current?.show({
        severity: 'error',
        summary: text('error'),
        detail: text('common.removingImpossible'),
        life: 5000
      })

      return false
    }

    remove(`/api/${slug}/${params.id}`)
      .then(_ => toast.current?.show({
        severity: 'success',
        summary: text('success'),
        detail: text('common.successDeleted'),
        life: 5000
      }))
      .then(_ => {
        navigate(`/${slug}`, { replace: true })
      })
      .catch((error) => console.dir(error))
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