interface CategoryMinimum {
  title: string
  _id: string
}

interface CategoryBasic extends CategoryMinimum {
  isDraft: boolean
  dateCreated: Date
  books: string[]
  picture?: string
}

interface CategoryAuthor extends CategoryBasic {
  firstName: string
  lastName?: string
  patronymicName?: string
}

interface CategoryField {
  key: string
  label: string,
  type: string,
  value: string | File
}

interface CategoryForm {
  [index: string]: CategoryField[]
}

export {
  CategoryMinimum,
  CategoryBasic,
  CategoryAuthor,
  CategoryField,
  CategoryForm
}