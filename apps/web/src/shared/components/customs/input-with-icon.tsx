import { InfoIcon, LucideIcon } from 'lucide-react'
import { ComponentProps } from 'react'

import { cn } from '@/shared/libs/utils'

import { Input } from '../primitives/input'
import { Label } from '../primitives/label'

interface InputWithIconProps extends ComponentProps<typeof Input> {
  id: string
  label?: string
  icon?: LucideIcon
  error?: string
  hiddenError?: boolean
  width?: string | number
}

export function InputWithIcon({
  id,
  label,
  icon: Icon,
  error,
  hiddenError = false,
  width,
  ...rest
}: InputWithIconProps) {
  return (
    <div>
      <div className="space-y-1">
        {label && <Label htmlFor={id}>{label}</Label>}
        <div
          className="group transparent relative"
          style={width ? { width: width } : {}}
        >
          <Input
            id={id}
            className={cn('bg-background', !!Icon && 'pl-9')}
            {...rest}
          />
          {Icon && (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <Icon className="text-muted-foreground group-focus-within:text-primary h-4 w-4 transition-colors" />
            </span>
          )}
        </div>
      </div>
      {!hiddenError && (
        <div className="mt-1 flex h-4 items-center gap-2">
          {error && (
            <>
              <InfoIcon className="text-destructive group-focus-within:text-primary h-3 w-3 transition-colors" />
              <p className="text-destructive text-xs">{error}</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
