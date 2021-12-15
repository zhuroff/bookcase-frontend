const deepFreeze = (data: any) => {
  const propNames = Object.getOwnPropertyNames(data)

  propNames.forEach((name: string) => {
    const property = data[name]

    if (property && typeof property === 'object') {
      deepFreeze(property)
    }
  })

  return Object.freeze(data)
}

export default deepFreeze
