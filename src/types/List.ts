import { TBooksListItem } from "./Books"
import { TCategoryMin } from "./Categories"

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

export type TBookList = TCategoryMin & {
  lists: TCategoryMin[]
  isDeleted?: boolean
  isNew?: boolean
}
