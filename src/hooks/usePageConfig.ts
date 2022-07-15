import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TPageConfig } from '../types/Common'

type TPageConfigProps = {
  pageKey: string
  isModal?: true
}

export const usePageConfig = ({ pageKey, isModal }: TPageConfigProps) => {
  const notInitialRender = useRef(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [isConfigReady, setIsConfigReady] = useState(false)
  const [pageConfig, setPageConfig] = useState<TPageConfig>({
    page: searchParams.get('page') || 1,
    sort: { title: 1 },
    isDraft: false,
    limit: 50
  })

  const restoreSavedConfig = () => {
    const storedPageConfig = localStorage.getItem(pageKey)

    if (storedPageConfig) {
      setPageConfig({ ...pageConfig, ...JSON.parse(storedPageConfig) })
    }
  }

  const updateLocalStorage = () => {
    const pageConfigClone: Partial<TPageConfig> = { ...pageConfig }
    delete pageConfigClone.page
    localStorage.setItem(pageKey, JSON.stringify(pageConfigClone))
  }

  useEffect(() => {
    if (!isModal) {
      restoreSavedConfig()
      setSearchParams(`?page=${pageConfig.page}`)
    }

    setIsConfigReady(true)
  }, [])

  useEffect(() => {
    if (!isModal) {
      if (notInitialRender.current && isConfigReady) {
        updateLocalStorage()
        setSearchParams(`?page=${pageConfig.page}`)
      } else if (isConfigReady) {
        notInitialRender.current = true
      }
    }
  }, [pageConfig])

  return isConfigReady
    ? [pageConfig, setPageConfig] as const
    : [null, setPageConfig] as const
}
