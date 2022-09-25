import { TCategoryBasic } from "./Categories"

export type TNoteSource = {
  entity: string
  reference: TCategoryBasic
}

export type TNote = {
  _id: string
  title: string
  dateCreated: string
  text: string
  references?: TCategoryBasic[]
  source?: TNoteSource
}
