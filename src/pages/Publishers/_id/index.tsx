import { observer } from 'mobx-react-lite';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ItemActions } from '../../../components/ItemActions/ItemActions';
import { Preloader } from '../../../components/Preloader/Preloader';
import { PublisherView } from '../../../components/PublisherView/PublisherView';
import { useApi } from '../../../hooks/useApi';
import { useConfirm } from '../../../hooks/useConfirm';
import { useLocale } from '../../../hooks/useLocale';
import { useToast } from '../../../hooks/useToast';
import { TCategoryPublisherPage } from '../../../types/Categories';

export const Publisher = observer(() => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  const { text } = useLocale()
  const { get, patch, remove } = useApi()
  const [isPublisherFetched, setIsPublisherFetched] = useState(false)
  const [publisher, setPublisher] = useReducer(
    (publisher: TCategoryPublisherPage, payload: Partial<TCategoryPublisherPage>) => ({ ...publisher, ...payload }),
    {} as TCategoryPublisherPage
  )
  const [updates, setUpdates] = useState<Set<keyof TCategoryPublisherPage>>(new Set())
  const { callConfirmation } = useConfirm()

  const fetchPublisher = () => {
    get<TCategoryPublisherPage>(`/api/publishers/${params.id}`)
      .then((response) => setPublisher(response.data))
      .then(_ => setIsPublisherFetched(true))
      .catch((error) => console.dir(error))
  }

  const updatePublisherTitle = (value: string) => {
    setPublisher({ ...publisher, title: value })
    setUpdates(new Set(updates.add('title')))
  }

  const savePublisher = () => {
    const payload = Array.from(updates).reduce<Partial<TCategoryPublisherPage>>((acc, next) => {
      // @ts-ignore
      acc[next] = publisher[next]
      return acc
    }, {})

    patch<{ isSuccess: true }>(`/api/publishers/${params.id}`, payload)
      .then(_ => toast.current?.show({
        severity: 'success',
        summary: text('success'),
        detail: text('publishers.successSaving'),
        life: 5000
      }))
      .catch((error) => console.dir(error))
  }

  const deletePublisher = () => {

  }

  const draftingOrPublishing = () => {

  }

  useEffect(() => {
    if (!location.pathname.includes('/edit') || !publisher._id) {
      setIsPublisherFetched(false)
      fetchPublisher()
    }
  }, [location])

  return (
    <>
      {!isPublisherFetched ?
        <Preloader /> :
        <>
          <PublisherView
            publisher={publisher}
            isEditable={location.pathname.includes('/edit')}
            updatePublisherTitle={updatePublisherTitle}
          />

          <footer className="book__footer">
            <ItemActions
              isDraft={publisher.isDraft}
              isEditMode={location.pathname.includes('/edit')}
              saveEntity={savePublisher}
              draftingOrPublishing={draftingOrPublishing}
              cancelEditingEntity={() => {
                navigate(`/publishers/${params.id}`, { replace: true })
              }}
              editEntity={() => {
                navigate(`/publishers/${params.id}/edit`, { replace: true })
              }}
              deleteEntity={(event) => callConfirmation(event, deletePublisher)}
            />
          </footer>
        </>
      }
    </>
  )
})