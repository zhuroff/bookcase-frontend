import { CategoryMinimum } from './Category'

interface BookAuthor {
  author: {
    _id: string
    title: string
  }
  role: string
}

interface BookPublisher {
  city: string
  code: string
  publisher: CategoryMinimum
}

interface BookLink {
  url: string
  title: string
}

interface BookStatus {
  start?: string | null
  finish?: string | null
}

interface BasicBook {
  _id: string
  title: string
  coverImage: string
  pages: number
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
  dateModified: string
  file: string
  format: string
  isDraft: boolean
  links: BookLink[]
  publicationYear: number
  publishers: BookPublisher[]
  rating: number
  series: string | null
  status: BookStatus
  subtitle: string
}

interface BookState {
  book: EntireBook
}

export {
  BookStatus,
  BasicBook,
  EntireBook,
  BookState
}
