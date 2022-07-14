import { ReactNode } from 'react'
import { TBookBasic } from './Books'
import { TCategoryBasic } from './Categories'

export type TEntityLink = {
  title: string
  url: string
}

type TRoute = {
  path: string
  element: ReactNode
  title?: string
}

type TCollectionEntities =
  'books' |
  'genres' |
  'series' |
  'authors' |
  'lists' |
  'publishers'

type TSearchResponse = {
  [key in TCollectionEntities]: TBookBasic[] | TCategoryBasic[]
}

type TPaginatorResponse = {
  page: number
  totalDocs: number
  totalPages: number
}

type TEntitySortingKeys = 'dateCreated' | 'title'

type TEntitySorting = {
  [key in TEntitySortingKeys]: 1 | -1
}

type TPageConfig = {
  page: string | number,
  sort: Partial<TEntitySorting>,
  limit: number,
  isDraft: boolean,
  unlistedOf?: string
  paperWithoutFile?: boolean
  accountableOnly?: boolean
}

export type {
  TRoute,
  TCollectionEntities,
  TSearchResponse,
  TPaginatorResponse,
  TEntitySortingKeys,
  TEntitySorting,
  TPageConfig
}
