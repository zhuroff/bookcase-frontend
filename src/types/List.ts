import { TBooksListItem } from "./Books"
import { TEntityBasic } from "./Common"

export type TListContent = {
  _id: string
  book: TBooksListItem
  comment?: string
}

export type TListSection = {
  _id: string
  title: string
  contents: TListContent[]
}

export type TListPage = {
  _id: string
  title: string
  isDraft: boolean
  lists: TListSection[]
}

export type TBookList = TEntityBasic & {
  lists: TEntityBasic[]
  isDeleted?: boolean
  isAdded?: boolean
  isChanged?: boolean
}
