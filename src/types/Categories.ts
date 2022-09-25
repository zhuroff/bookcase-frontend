import { TPaginatorResponse, EntityLink, TEntityBasic } from "./Common"
import { TBooksListItem } from './Books'

export type TCategoryKeys = 'authors' | 'genres' | 'publishers' | 'series'

export type TCategoryBasic = TEntityBasic & {
  isDraft: boolean
  booksCount: number
  isAdded?: true
  isDeleted?: boolean
  isChanged?: boolean
}

export type TCategoryPage = TCategoryBasic & {
  books: {
    docs: TBooksListItem[],
    pagination: TPaginatorResponse
  }
}

export type TCategoryAuthor = TCategoryBasic & {
  firstName: string
  lastName?: string
  patronymicName?: string
}

export type TCategoryAuthorPage = Omit<TCategoryAuthor, 'books'> & TCategoryPage & {
  links?: EntityLink[]
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

export type TAuthorsResponse = TCategoriesResponse & {
  docs: TCategoryAuthor[]
  pagination: TPaginatorResponse
}
