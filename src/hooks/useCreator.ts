import { useNavigate } from 'react-router-dom';
import { TCategoryBasic } from '../types/Categories';
import { useApi } from './useApi';
import { useLocale } from './useLocale';
import { useToast } from './useToast';

export const useCreator = () => {
  const { api: { createEntity } } = useApi()
  const { text } = useLocale()
  const toast = useToast()
  const navigate = useNavigate()

  const create = async <T extends Partial<TCategoryBasic>>(entityType: string, payload: T, isRedirect = true) => {
    return createEntity<T, Partial<TCategoryBasic>>(`${entityType}/create`, payload)
      .then((data) => {
        if (isRedirect) {
          navigate(`/${entityType}/${data._id}/edit`, { replace: true })
        } else {
          toast.current?.show({
            severity: 'success',
            summary: text('success'),
            detail: text('common.successCreated'),
            life: 5000
          })
          return data
        }
      })
      .catch((error) => console.error(error))
  }

  return [create] as const
}