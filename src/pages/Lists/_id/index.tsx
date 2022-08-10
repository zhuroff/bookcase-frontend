import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ItemActions } from '../../../components/ItemActions/ItemActions';
import { ListPageSection } from '../../../components/ListPageSection/ListPageSection';
import { Preloader } from '../../../components/Preloader/Preloader';
import { useApi } from '../../../hooks/useApi';
import { useConfirm } from '../../../hooks/useConfirm';
import { useLocale } from '../../../hooks/useLocale';
import { TListPage } from '../../../types/List';

export const ListPage = observer(() => {
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()
  const { text } = useLocale()
  const { get, patch, remove } = useApi()
  const { callConfirmation } = useConfirm()
  const [searchParams] = useSearchParams()
  const [isListPageFetched, setListPageFetchedState] = useState(false)
  const [page, setPage] = useState({} as TListPage)

  const fetchListPage = () => {
    get<TListPage>(`/api/lists/${params.id}`)
      .then((response) => setPage(response.data))
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
    if (!location.pathname.includes('/edit') || !page._id) {
      setListPageFetchedState(false)
      fetchListPage()
    }
  }, [location])

  return (
    <>
      {!isListPageFetched ?
        <Preloader /> :
        <>
          <header className="section__heading">
            <h2 className="section__title">{page.title}</h2>
            {location.pathname.includes('/edit') &&
              <Button
                label={text('common.add')}
              />
            }
          </header>

          {
            page.lists.map((section) => (
              <ListPageSection
                key={section._id}
                section={section}
                targetBook={searchParams.get('book')}
                isEditable={location.pathname.includes('/edit')}
              />
            ))
          }

          <footer className="book__footer">
            <ItemActions
              isDraft={page.isDraft}
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
