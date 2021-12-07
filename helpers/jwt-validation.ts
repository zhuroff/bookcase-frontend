import jwtDecode from 'jwt-decode'

interface JwtDecodeToken {
  login: string
  id: string
  iat: number
  exp: number
}

const isJwtValid = (token: string): boolean => {
  if (!token) return false

  const jwtData = jwtDecode<JwtDecodeToken>(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}

export default isJwtValid
