interface CategoryMinimum {
  title: string
  _id: string
}

interface CategoryBasic extends CategoryMinimum {
  isDraft: boolean
  dateCreated: Date
  relatedBooks: string[]
}

interface CategoryAuthor extends CategoryBasic {
  firstName : string
  lastName: string
  patronymicName: string
}

export {
  CategoryMinimum,
  CategoryBasic,
  CategoryAuthor
}