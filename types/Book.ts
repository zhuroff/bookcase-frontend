import { CategoryMinimum } from './Category'

interface BookAuthor {
  author: {
    _id: string
    title: string
  }
  role: string
}

interface BookLink {
  url: string
  title: string
}

interface BookStatus {
  start?: string
  finish?: string
}

interface EntireBook {
  summary: string
  authors: BookAuthor[]
  contents: string
  coverImage: string
  preCoverImage: string | null
  coverType: string
  dateCreated: string
  description: string
  dateModified: string,
  file: string
  format: string
  genres: CategoryMinimum[]
  inList: CategoryMinimum[]
  isDraft: boolean
  links: BookLink[]
  pages: number
  publicationYear: number
  publishers: CategoryMinimum[]
  rating: number
  series: string | null
  status: BookStatus
  subtitle: string
  title: string
  _id: string
}

interface BookState {
  book: EntireBook
}

export {
  BookStatus,
  EntireBook,
  BookState
}
