interface StringSignature {
  [index: string]: string
}

interface PageViewConfig {
  page: number
  sort: { [index: string]: number }
  limit: number
  isDraft: boolean
}

export {
  StringSignature,
  PageViewConfig
}
