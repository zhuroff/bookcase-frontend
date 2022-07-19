import { TBooksListItem } from "./Books"

export type TListContent = {
  _id: string
  book: TBooksListItem
  comment?: string
}

export type TListSection = {
  _id: string
  title: string
  content: TListContent[]
}

export type TListPage = {
  _id: string
  title: string
  isDraft: boolean
  lists: TListSection[]
}