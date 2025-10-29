type User = {
  id: string
  name: string
  email: string
  password: string
}

type UserCredentials = {
  email: string
  password: string
}

export { type User, type UserCredentials }
