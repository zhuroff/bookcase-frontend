import { useNavigate } from 'react-router-dom';
import { TCategoryBasic } from '../types/Categories';
import { useApi } from './useApi';
import { useLocale } from './useLocale';
import { useToast } from './useToast';

export const useCreator = () => {
  const { post } = useApi()
  const { text } = useLocale()
  const toast = useToast()
  const navigate = useNavigate()

  const createEntity = async <T extends Partial<TCategoryBasic>>(entityType: string, payload: T, isRedirect = true) => {
    return await post<T>(`/api/${entityType}/create`, payload)
      .then((response) => {
        if (isRedirect) {
          navigate(`/${entityType}/${response.data._id}/edit`, { replace: true })
        } else {
          toast.current?.show({
            severity: 'success',
            summary: text('success'),
            detail: text('common.successCreated'),
            life: 5000
          })
          return response.data
        }
      })
      .catch((error) => console.dir(error))
  }

  return [createEntity] as const
}