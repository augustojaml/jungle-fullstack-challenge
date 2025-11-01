export interface GetInitialsLetterNameParams {
  name?: string
  email?: string
}

const getInitialsLetterName = ({
  name,
  email,
}: GetInitialsLetterNameParams) => {
  const base = (name && name.trim()) || email || 'User'
  const parts = base.split(' ').filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return base.slice(0, 2).toUpperCase()
}

export { getInitialsLetterName }
