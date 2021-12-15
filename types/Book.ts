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

interface BasicBook {
  _id: string
  title: string
  coverImage: string
  authors: BookAuthor[]
  genres: CategoryMinimum[]
  lists: CategoryMinimum[]
}

interface EntireBook extends BasicBook {
  summary: string
  contents: string
  preCoverImage: string | null
  coverType: string
  dateCreated: string
  description: string
  dateModified: string,
  file: string
  format: string
  isDraft: boolean
  links: BookLink[]
  pages: number
  publicationYear: number
  publishers: CategoryMinimum[]
  rating: number
  series: string | null
  status: BookStatus
  subtitle: string
}

type EntireBookTypes = null
  | string
  | number
  | boolean
  | BookAuthor[]
  | CategoryMinimum[]
  | BookLink[]
  | BookStatus

interface EntireBookKeys {
  [index: string]: EntireBookTypes
}

interface BookState {
  book: EntireBook
}

export {
  BookStatus,
  BasicBook,
  EntireBook,
  EntireBookKeys,
  BookState
}
