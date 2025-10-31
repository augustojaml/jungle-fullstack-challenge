import { LogOutIcon } from 'lucide-react'

import { useLogoutMutation } from '@/features/auth/react-query/use-logout-mutation'
import { cn } from '@/shared/libs/utils'

import { ButtonToggleTheme } from '../customs/button-toggle-theme'
import { Avatar, AvatarFallback, AvatarImage } from '../primitives/avatar'
import { Button } from '../primitives/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../primitives/dropdown-menu'

const MainHeader = () => {
  const { mutateAsync: signOut } = useLogoutMutation()
  const handleSignOut = async () => {
    signOut()
  }

  const isFetching = false
  const isError = false

  const user = {
    id: '1',
    name: 'Augusto Monteiro',
    avatarUrl: 'https://github.com/augustojaml.png',
    email: '2NQ8P@example.com',
  }

  return (
    <header className="bg-background/70 sticky top-0 z-40 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* logo + brand */}

        <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
          <span className="text-sm font-bold">TI</span>
        </div>

        <div className="flex items-center gap-3">
          <ButtonToggleTheme />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  'relative h-9 rounded-full px-2',
                  // amplia a área clicável quando há nome
                  user?.name ? 'pr-3 pl-2' : 'h-9 w-9 justify-center',
                )}
                aria-label="Open user menu"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="bg-primary/20 text-primary h-9 w-9 rounded-full">
                    {/* se tiver sua url no backend, use-a. senão, pode manter um placeholder */}
                    <AvatarImage
                      src={user?.avatarUrl || undefined}
                      alt={user?.name || user?.email || 'User'}
                      className="h-full w-full rounded-full"
                    />
                    <AvatarFallback className="h-full w-full rounded-full text-xs!">
                      AM
                    </AvatarFallback>
                  </Avatar>

                  {/* nome à direita do avatar (some em telas muito pequenas) */}
                  <div className="hidden flex-col items-start leading-tight sm:flex">
                    <span className="line-clamp-1 max-w-40 truncate text-sm font-medium">
                      {user?.name}
                    </span>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="space-y-1">
                <div className="truncate text-sm font-medium">
                  {isFetching
                    ? 'Carregando…'
                    : isError
                      ? 'Usuário'
                      : user?.name || 'Usuário'}
                </div>
                <div className="text-muted-foreground truncate text-xs">
                  {user?.email || '—'}
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onSelect={handleSignOut}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export { MainHeader }
