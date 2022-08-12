import { observer } from 'mobx-react-lite';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthorView } from '../../../components/AuthorView/AuthorView';
import { ItemActions } from '../../../components/ItemActions/ItemActions';
import { Preloader } from '../../../components/Preloader/Preloader';
import { useApi } from '../../../hooks/useApi';
import { useConfirm } from '../../../hooks/useConfirm';
import { useLocale } from '../../../hooks/useLocale';
import { useToast } from '../../../hooks/useToast';
import { TCategoryAuthorPage } from '../../../types/Categories';
import { EntityError } from '../../../types/Common';

export const Author = observer(() => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  const { text } = useLocale()
  const { get, patch, remove } = useApi()
  const [isAuthorFetched, setIsAuthorFetched] = useState(false)
  const [author, setAuthor] = useReducer(
    (author: TCategoryAuthorPage, payload: Partial<TCategoryAuthorPage>) => ({ ...author, ...payload }),
    {} as TCategoryAuthorPage
  )
  const [updates, setUpdates] = useState<Set<keyof TCategoryAuthorPage>>(new Set())
  const { callConfirmation } = useConfirm()

  const fetchAuthor = () => {
    get<TCategoryAuthorPage>(`/api/authors/${params.id}`)
      .then((response) => setAuthor(response.data))
      .then(_ => setIsAuthorFetched(true))
      .catch((error) => console.dir(error))
  }

  const saveAuthor = () => {
    if (updates.size === 0) {
      toast.current?.show({
        severity: 'warn',
        summary: text('error'),
        detail: text('page.unchanged'),
        life: 5000
      })

      return false
    }

    const payload = Array.from(updates).reduce<Partial<TCategoryAuthorPage>>((acc, next) => {
      // @ts-ignore
      acc[next] = author[next].replace(/\s+/g, ' ').trim()
      return acc
    }, {})

    patch(`/api/authors/${params.id}`, payload)
      .then(_ => toast.current?.show({
        severity: 'success',
        summary: text('success'),
        detail: text('authors.successSaving'),
        life: 5000
      }))
      .then(() => setUpdates((prevState) => new Set([...prevState].filter(() => false))))
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

  const deleteAuthor = () => {
    if (author.books.length > 0) {
      toast.current?.show({
        severity: 'error',
        summary: text('error'),
        detail: text('common.removingImpossible'),
        life: 5000
      })

      return false
    }

    remove(`/api/authors/${params.id}`)
      .then(_ => toast.current?.show({
        severity: 'success',
        summary: text('success'),
        detail: text('authors.successDelete'),
        life: 5000
      }))
      .then(_ => {
        navigate('/authors', { replace: true })
      })
      .catch((error) => console.dir(error))
  }

  const draftingOrPublishing = () => {
    if (!author.isDraft && author.books.length > 0) {
      toast.current?.show({
        severity: 'error',
        summary: text('error'),
        detail: text('common.draftImpossible'),
        life: 5000
      })

      return false
    }

    patch<{ isSuccess: true }>(`/api/authors/${params.id}`, { isDraft: !author.isDraft, firstName: author.firstName })
      .then(_ => toast.current?.show({
        severity: 'success',
        summary: text('success'),
        detail: text(author.isDraft ? 'common.successPublished' : 'common.successDrafted'),
        life: 5000
      }))
      .then(_ => setAuthor({ ...author, isDraft: !author.isDraft }))
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

  const updateAuthorName = (value: string, key: keyof TCategoryAuthorPage) => {
    setAuthor({ ...author, [key]: value })
    setUpdates((prevState) => new Set([...prevState, key]))
  }

  const appendLinkRow = () => {
    setAuthor({
      ...author,
      links: [
        ...author.links || [],
        { title: '', url: '' }
      ]
    })

    setUpdates((prevState) => new Set([...prevState, 'links']))
  }

  const removeLinkRow = (index: number) => {
    setAuthor({
      ...author,
      links: author.links?.filter((_, i) => (
        i !== index
      ))
    })

    setUpdates((prevState) => new Set([...prevState, 'links']))
  }

  const setLinkParam = (value: string, index: number, key: string) => {
    setAuthor({
      ...author,
      links: author.links?.map((link, i) => (
        i !== index
          ? link
          : { ...link, [key]: value }
      ))
    })

    setUpdates((prevState) => new Set([...prevState, 'links']))
  }

  useEffect(() => {
    if (!location.pathname.includes('/edit') || !author._id) {
      setIsAuthorFetched(false)
      fetchAuthor()
    }
  }, [location])

  return (
    <>
      {!isAuthorFetched ?
        <Preloader /> :
        <>
          <AuthorView
            author={author}
            isEditable={location.pathname.includes('/edit')}
            updateAuthorName={updateAuthorName}
            appendLinkRow={appendLinkRow}
            removeLinkRow={removeLinkRow}
            setLinkParam={setLinkParam}
          />

          <footer className="book__footer">
            <ItemActions
              isDraft={author.isDraft}
              isEditMode={location.pathname.includes('/edit')}
              saveEntity={saveAuthor}
              draftingOrPublishing={draftingOrPublishing}
              cancelEditingEntity={() => {
                navigate(`/authors/${params.id}`, { replace: true })
              }}
              editEntity={() => {
                navigate(`/authors/${params.id}/edit`, { replace: true })
              }}
              deleteEntity={(event) => callConfirmation(event, deleteAuthor)}
            />
          </footer>
        </>
      }
    </>
  )
})