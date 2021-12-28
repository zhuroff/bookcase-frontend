interface StringSignature {
  [index: string]: string
}

interface FieldPayloadEmit {
  key: string
  value: any
}

interface PageViewConfig {
  page: number
  sort: { [index: string]: number }
  limit: number
  isDraft: boolean
}

export {
  StringSignature,
  FieldPayloadEmit,
  PageViewConfig
}
