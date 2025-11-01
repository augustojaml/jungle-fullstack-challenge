import bcrypt from 'bcrypt'

const passwdBcrypt = {
  hash: async (password: string, saltRounds: number = 10) => {
    return await bcrypt.hash(password, saltRounds)
  },
  compare: async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash)
  },
}

export { passwdBcrypt }
