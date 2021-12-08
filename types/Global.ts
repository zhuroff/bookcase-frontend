import { CategoryBasic } from '~/types/Category'

type TSort = { title: number } | { dateCreated: number }

interface MinimumRow {
  _id: string
  title: string
}

interface ISearchPayload {
  query: string
  page: string
  data?: never[] | null
}

interface IPagination {
  totalDocs: number
  totalPages: number
  isPaginated: boolean
}

interface ISortPayload {
  key: string
  dir: number
  value: string
}

interface IModal {
  isActive: boolean
  heading: string
  replacingID: string | null
  sort: TSort
  currentPage: number
  isFetched: boolean
  data: CategoryBasic[]
  pagination: IPagination
  collection: string
  selected: string[]
}

interface IModalPayload {
  modalHeading: string
  collection: string
  row: CategoryBasic | null
  isBooks?: boolean
}

export { TSort, MinimumRow, ISearchPayload, IPagination, ISortPayload, IModal, IModalPayload }