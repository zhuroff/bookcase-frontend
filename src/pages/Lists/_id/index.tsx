import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ItemActions } from '../../../components/ItemActions/ItemActions';
import { ListPageView } from '../../../components/ListPageView/ListPageView';
import { Preloader } from '../../../components/Preloader/Preloader';
import { useApi } from '../../../hooks/useApi';
import { useConfirm } from '../../../hooks/useConfirm';

export const ListPage = observer(() => {
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()
  const { get, patch, remove } = useApi()
  const { callConfirmation } = useConfirm()
  const [isListPageFetched, setListPageFetchedState] = useState(false)
  const [content, setContent] = useState({})

  const fetchListPage = () => {
    get<any>(`/api/lists/${params.id}`)
      .then((response) => setContent(response.data))
      .then(_ => setListPageFetchedState(true))
      .catch((error) => console.dir(error))
  }

  const saveListPage = () => {

  }

  const draftingOrPublishing = () => {

  }

  const deleteListPage = () => {

  }

  useEffect(() => {
    if (!location.pathname.includes('/edit') || !content._id) {
      setListPageFetchedState(false)
      fetchListPage()
    }
  }, [location])

  return (
    <>
      {!isListPageFetched ?
        <Preloader /> :
        <>
          <ListPageView
            content={content}
            isEditable={location.pathname.includes('/edit')}
          />

          <footer className="book__footer">
            <ItemActions
              isDraft={content.isDraft}
              isEditMode={location.pathname.includes('/edit')}
              saveEntity={saveListPage}
              draftingOrPublishing={draftingOrPublishing}
              cancelEditingEntity={() => {
                navigate(`/lists/${params.id}`, { replace: true })
              }}
              editEntity={() => {
                navigate(`/lists/${params.id}/edit`, { replace: true })
              }}
              deleteEntity={(event) => callConfirmation(event, deleteListPage)}
            />
          </footer>
        </>
      }
    </>
  )
})
