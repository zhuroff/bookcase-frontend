import { ReactNode } from 'react'
import { TBookBasic } from './Books'

export type TAuthPayload = {
  email: string
  password: string
}

export type TEntityBasic = {
  _id: string
  title: string
}

export type TEntityError = {
  value: unknown
  msg: string
  param: string
}

export type EntityLink = {
  _id?: string
  title: string
  url: string
}

export type TCategoriesIndexProps = {
  slug: string
}

export type TRoute = {
  path: string
  element: ReactNode
  title?: string
}

export type TCollectionEntities =
  'books' |
  'genres' |
  'series' |
  'authors' |
  'lists' |
  'publishers'

export type TSearchResponse = Record<TCollectionEntities, TBookBasic[] | TEntityBasic[]>

export type TPaginatorResponse = {
  page: number
  totalDocs: number
  totalPages: number
}

export type TEntitySortingKeys = 'dateCreated' | 'title'

export type TEntitySorting = Record<TEntitySortingKeys, 1 | -1>

export type TPageConfig = {
  page: string | number,
  sort: Partial<TEntitySorting>,
  limit: number,
  isDraft: boolean,
  unlistedOf?: string
  paperWithoutFile?: boolean
  accountableOnly?: boolean
  year?: number
}

export type TPaginatedListResponse<T> = {
  docs: T[]
  pagination: TPaginatorResponse
}
