import { X } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/libs/utils'

import { Button } from '../primitives/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '../primitives/dialog'
import { ButtonWithLoading } from './button-with-loading'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type ModalAction = {
  label: string
  onClick?: () => void | Promise<void>
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  loading?: boolean
  disabled?: boolean
  isSubmit?: boolean
}

export type DialogModalProps = {
  open: boolean
  onOpenChange: (o: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  size?: ModalSize
  className?: string
  contentClassName?: string
  showClose?: boolean
  showBlobs?: boolean
  primaryAction?: ModalAction
  secondaryAction?: ModalAction
  children?: React.ReactNode
}

const sizeClass: Record<ModalSize, string> = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-2xl',
  xxl: 'sm:max-w-3xl',
}

const DialogModal = ({
  open,
  onOpenChange,
  title,
  description,
  icon,
  size = 'md',
  className,
  contentClassName,
  showClose = true,
  showBlobs = true,
  primaryAction,
  secondaryAction,
  children,
}: DialogModalProps) => {
  const hasIcon = !!icon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className={cn(
            'bg-background/60 fixed inset-0 z-50 backdrop-blur-sm',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          )}
        />

        <DialogContent
          aria-describedby={undefined}
          showCloseButton={false}
          className={cn(
            'fixed top-1/2 left-1/2 z-50 w-[95vw] -translate-x-1/2 -translate-y-1/2',
            'bg-card/90 rounded-lg border p-0 shadow-xl backdrop-blur',
            'data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=open]:fade-in-0',
            'data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=closed]:fade-out-0',
            sizeClass[size],
            className,
          )}
        >
          {showBlobs && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="from-primary/15 to-secondary/15 absolute -top-16 -left-16 h-40 w-[160%] rounded-full bg-linear-to-br blur-3xl" />
              <div className="to-primary/10 absolute -right-20 -bottom-20 h-44 w-[140%] rounded-full bg-linear-to-tr from-emerald-400/10 blur-3xl" />
            </div>
          )}

          <div
            className={cn(
              'relative z-10 max-h-[85vh] overflow-y-auto p-6',

              hasIcon
                ? 'grid grid-cols-[auto,1fr] gap-3'
                : 'grid grid-cols-1 gap-3',
              contentClassName,
            )}
          >
            {/* HEADER */}
            {hasIcon && (
              <div className="bg-primary/10 text-primary row-span-2 self-start rounded-full p-2">
                {icon}
              </div>
            )}

            <DialogHeader
              className={cn('mb-2 p-0', hasIcon ? 'col-start-2' : '')}
            >
              <div className="grid grid-cols-[1fr,auto] items-start gap-4">
                <div className="flex min-w-0 items-start">
                  <div className="flex-1">
                    {title && (
                      <DialogTitle className="truncate">{title}</DialogTitle>
                    )}
                    {description && (
                      <DialogDescription className="text-muted-foreground mt-1">
                        {description}
                      </DialogDescription>
                    )}
                  </div>
                  {showClose && (
                    <DialogClose asChild>
                      <Button variant="ghost" size="icon" className="shrink-0">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Fechar</span>
                      </Button>
                    </DialogClose>
                  )}
                </div>
              </div>
            </DialogHeader>

            {/* BODY: alinha com o título (coluna 2 quando tem ícone) */}
            <div
              className={cn('text-foreground', hasIcon ? 'col-start-2' : '')}
            >
              {children}
            </div>

            {/* FOOTER: também alinha com o título */}
            {(primaryAction || secondaryAction) && (
              <DialogFooter
                className={cn(
                  'mt-4 flex w-full items-center justify-end gap-2',
                  hasIcon ? 'col-start-2' : '',
                )}
              >
                {secondaryAction && (
                  <ButtonWithLoading
                    type="button"
                    variant={secondaryAction.variant ?? 'outline'}
                    onClick={secondaryAction.onClick}
                    disabled={secondaryAction.disabled}
                    isLoading={secondaryAction.loading}
                  >
                    {secondaryAction.label}
                  </ButtonWithLoading>
                )}
                {primaryAction && (
                  <ButtonWithLoading
                    type={primaryAction.isSubmit ? 'submit' : 'button'}
                    variant={primaryAction.variant ?? 'default'}
                    onClick={primaryAction.onClick}
                    disabled={primaryAction.disabled}
                    isLoading={primaryAction.loading}
                  >
                    {primaryAction.label}
                  </ButtonWithLoading>
                )}
              </DialogFooter>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export { DialogModal }
