// src/shared/components/customs/textarea-with-icon.tsx

import { InfoIcon, type LucideIcon } from 'lucide-react'
import { type ComponentProps } from 'react'

import { cn } from '@/shared/libs/utils'

import { Label } from '../primitives/label'
import { Textarea } from '../primitives/textarea'

interface TextareaWithIconProps extends ComponentProps<typeof Textarea> {
  id: string
  label?: string
  icon?: LucideIcon
  error?: string
  height?: number
}

export function TextareaWithIcon({
  id,
  label,
  icon: Icon,
  error,
  height = 75,
  className,
  ...rest
}: TextareaWithIconProps) {
  return (
    <div className="w-full">
      <div className="space-y-1">
        {label && <Label htmlFor={id}>{label}</Label>}

        <div className="group relative">
          <Textarea
            id={id}
            style={{ height, resize: 'none' }}
            className={cn(
              !!Icon && 'pl-9',
              error && 'border-destructive',
              className,
            )}
            {...rest}
          />

          {Icon && (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-start pt-3">
              <Icon className="text-muted-foreground group-focus-within:text-primary h-4 w-4 transition-colors" />
            </span>
          )}
        </div>
      </div>

      <div className="mt-1 flex h-4 items-center gap-2">
        {error && (
          <>
            <InfoIcon className="text-destructive h-3 w-3" />
            <p className="text-destructive text-xs">{error}</p>
          </>
        )}
      </div>
    </div>
  )
}
