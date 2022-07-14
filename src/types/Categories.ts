import { TPaginatorResponse, TEntityLink } from "./Common"
import { TBooksListItem } from './Books'

export type TCategoryBasic = {
  _id: string
  title: string
  isDraft: boolean
  isNew?: true
  isDeleted?: boolean
}

export type TCategoryAuthor = TCategoryBasic & {
  books: number
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
  isNew?: true
  isDeleted?: boolean
}

export type TCategoryPublisherBook = {
  _id: string
  city: string
  code: string
  publisher: TCategoryBasic
  isNew?: true
  isDeleted?: boolean
}

export type TCategoriesResponse = {
  docs: TCategoryBasic[]
  pagination: TPaginatorResponse
}

export type TAuthorsResponse = TCategoriesResponse & {
  docs: TCategoryAuthor[]
  pagination: TPaginatorResponse
}