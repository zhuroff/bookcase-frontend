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

export {
  CategoryMinimum,
  CategoryBasic,
  CategoryAuthor
}