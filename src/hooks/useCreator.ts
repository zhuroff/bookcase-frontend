import { useNavigate } from 'react-router-dom';
import { useApi } from './useApi';

export const useCreator = () => {
  const { post } = useApi()
  const navigate = useNavigate()

  const createEntity = (entityType: string) => {
    post<{ _id: string }>(`/api/${entityType}/create`)
      .then((response) => {
        navigate(`/${entityType}/${response.data._id}/edit`, { replace: true })
      })
      .catch((error) => console.dir(error))
  }

  return [createEntity] as const
}