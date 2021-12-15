interface StringSignature {
  [index: string]: string
}

interface FieldPayloadEmit {
  key: string
  value: string | number | boolean | File | object
}

export {
  StringSignature,
  FieldPayloadEmit
}
