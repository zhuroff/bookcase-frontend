import { TPaginatorResponse, TEntityLink } from "./Common"
import { TBooksListItem } from './Books'

export type TCategoryMin = {
  _id: string
  title: string
}

export type TCategoryBasic = TCategoryMin & {
  isDraft: boolean
  books: number
  isAdded?: true
  isDeleted?: boolean
  isChanged?: boolean
}

export type TCategoryAuthor = TCategoryBasic & {
  firstName: string
  lastName?: string
  patronymicName?: string
}

export type TCategoryAuthorPage = Omit<TCategoryAuthor, 'books'> & {
  books: TBooksListItem[]
  links?: TEntityLink[]
}

export type TCategoryAuthorBook = {
  author: TCategoryAuthor,
  _id: string
  role: string
  isAdded?: true
  isDeleted?: boolean
  isChanged?: boolean
}

export type TCategoryPublisherBook = {
  _id: string
  city: string
  code: string
  publisher: TCategoryBasic
  isAdded?: true
  isDeleted?: boolean
  isChanged?: boolean
}

export type TCategoriesResponse = {
  docs: TCategoryBasic[]
  pagination: TPaginatorResponse
}

export type TCategoryPage = Omit<TCategoryBasic, 'books'> & {
  books: TBooksListItem[]
}

export type TAuthorsResponse = TCategoriesResponse & {
  docs: TCategoryAuthor[]
  pagination: TPaginatorResponse
}
