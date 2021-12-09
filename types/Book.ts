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
  process: string
  start?: string
  finish?: string
}

interface EntireBook {
  article: string
  authors: BookAuthor[]
  contents: string
  coverImage: string
  coverType: string
  dateCreated: string
  description: string
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
