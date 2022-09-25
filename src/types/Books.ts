import { TCategoryAuthor, TCategoryAuthorBook, TCategoryBasic, TCategoryPublisherBook } from "./Categories"
import { TPaginatorResponse } from "./Common"
import { TBookList } from "./List"
import { TNote } from "./Note"

export type TBookStatus = {
  start: string | null
  finish: string | null
}

export type TBookBasic = {
  _id: string
  title: string
  subtitle?: string
  authors: TCategoryAuthor[]
}

export type TBooksListItem = TBookBasic & {
  pages: number
  coverImage?: string
  genres: TCategoryBasic[]
  isDraft: boolean
  lists: TCategoryBasic[]
  publicationYear: number
  status: TBookStatus
  accountability: boolean
}

export type TBookPage = Omit<TBooksListItem, 'authors' | 'lists'> & {
  contents?: string
  coverType: string
  description: string
  file?: string
  format: string
  links: string[]
  pages: number
  preCoverImage?: string
  publishers: TCategoryPublisherBook[]
  authors: TCategoryAuthorBook[]
  lists: TBookList[]
  rating?: number
  series: TCategoryBasic
  summary?: string
  notes: TNote[]
}

export type TBooksResponse = {
  docs: TBooksListItem[]
  pagination: TPaginatorResponse
}
