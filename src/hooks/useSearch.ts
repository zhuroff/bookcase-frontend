import { useEffect, useState } from 'react'
import { useApi } from './useApi';
import { useToast } from './useToast';
import { useLocale } from './useLocale';
import { useDebounce } from './useDebounce';

export type TUseSearchProps = {
  collection?: string
}

export const useSearch = <T>({ collection }: TUseSearchProps) => {
  const { post } = useApi()
  const { text } = useLocale()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<T | null>(null)
  const toast = useToast()
  const debouncedValue = useDebounce<string>(searchQuery)

  const fetchSearchResults = () => {
    post<T>('/api/search', { query: searchQuery, collection })
      .then((response) => setSearchResults(response.data))
      .catch((error) => {
        toast.current?.show({
          severity: 'error',
          summary: text('error'),
          detail: text(error.message),
          life: 3000
        });
      })
  }

  useEffect(() => {
    if (debouncedValue.length) {
      fetchSearchResults()
    }
  }, [debouncedValue])

  useEffect(() => {
    if (Array.isArray(searchResults) && !searchResults?.length) {
      toast.current?.show({
        severity: 'warn',
        summary: text('error'),
        detail: text('search.notFound'),
        life: 3000
      });
    }
  }, [searchResults])

  return [searchQuery, setSearchQuery, searchResults, setSearchResults] as const
}
