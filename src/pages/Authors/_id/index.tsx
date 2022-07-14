import { observer } from 'mobx-react-lite';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AuthorView } from '../../../components/AuthorView/AuthorView';
import { Preloader } from '../../../components/Preloader/Preloader';
import { useApi } from '../../../hooks/useApi';
import { useConfirm } from '../../../hooks/useConfirm';
import { TCategoryAuthorPage } from '../../../types/Categories';

export const Author = observer(() => {
  const params = useParams()
  const location = useLocation()
  const { get, post, remove } = useApi()
  const [isAuthorFetched, setIsAuthorFetched] = useState(false)
  const [author, setAuthor] = useReducer(
    (author: TCategoryAuthorPage, payload: Partial<TCategoryAuthorPage>) => ({ ...author, ...payload }),
    {} as TCategoryAuthorPage
  )
  const { callConfirmation } = useConfirm()

  const fetchAuthor = () => {
    get<TCategoryAuthorPage>(`/api/authors/${params.id}`)
      .then((response) => setAuthor(response.data))
      .then(_ => setIsAuthorFetched(true))
      .catch((error) => console.dir(error))
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
          />
        </>
      }
    </>
  )
})