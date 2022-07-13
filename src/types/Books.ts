import { TCategoryAuthor, TCategoryAuthorBook, TCategoryBasic, TCategoryPublisherBook } from "./Categories"
import { TPaginatorResponse } from "./Common"

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

export type TBookPage = Omit<TBooksListItem, 'authors'> & {
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
  rating?: number
  series?: TCategoryBasic
  summary?: string
}

export type TBooksResponse = {
  docs: TBooksListItem[]
  pagination: TPaginatorResponse
}
