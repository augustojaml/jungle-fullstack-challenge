import { User as UserIcon } from 'lucide-react'

import { getInitialsLetterName } from '@/shared/helpers/get-initials-letter-name'

import { Avatar, AvatarFallback, AvatarImage } from '../primitives/avatar'

interface UserAvatarProps {
  user?: {
    name: string
    email: string
    avatarUrl: string | null
  } | null
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  if (!user) {
    return (
      <Avatar className="bg-primary/20 text-primary flex h-9 w-9 items-center justify-center rounded-full">
        <UserIcon className="h-4 w-4" />
      </Avatar>
    )
  }

  return (
    <Avatar className="bg-primary/20 text-primary h-9 w-9 rounded-full">
      <AvatarImage
        src={user.avatarUrl || undefined}
        alt={user.name || user.email || 'User'}
        className="h-full w-full rounded-full"
      />
      <AvatarFallback className="h-full w-full rounded-full text-xs">
        {getInitialsLetterName({
          name: user.name,
          email: user.email,
        })}
      </AvatarFallback>
    </Avatar>
  )
}

export { UserAvatar }
