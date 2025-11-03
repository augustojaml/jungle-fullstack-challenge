// src/shared/components/customs/select-with-icon.tsx
import { InfoIcon, type LucideIcon } from 'lucide-react'
import { type ComponentProps, forwardRef } from 'react'

import { cn } from '@/shared/libs/utils'

import { Label } from '../primitives/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../primitives/select'

interface SelectOption {
  key: string
  value: string
}

interface SelectWithIconProps extends ComponentProps<typeof Select> {
  id: string
  name: string
  label?: string
  icon?: LucideIcon
  placeholder?: string
  options: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  error?: string
  className?: string
  disabled?: boolean
  hiddenError?: boolean
}

export const SelectWithIcon = forwardRef<
  HTMLButtonElement,
  SelectWithIconProps
>(
  (
    {
      id,
      name,
      label,
      icon: Icon,
      placeholder = 'Selecione...',
      options,
      value,
      onValueChange,
      error,
      className,
      disabled,
      hiddenError = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div>
        <div className="space-y-1">
          {label && <Label htmlFor={id}>{label}</Label>}

          <div className="group relative">
            <Select
              name={name}
              value={value}
              onValueChange={onValueChange}
              disabled={disabled}
              {...props}
            >
              <SelectTrigger
                ref={ref}
                id={id}
                className={cn(
                  'w-full',
                  !!Icon && 'pl-9',
                  error && 'border-destructive',
                  className,
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.key} value={opt.key}>
                    {opt.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {Icon && (
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <Icon className="text-muted-foreground group-focus-within:text-primary h-4 w-4 transition-colors" />
              </span>
            )}
          </div>
        </div>
        {!hiddenError && (
          <div className="flex h-10 items-center gap-2">
            {error && (
              <>
                <InfoIcon className="text-destructive h-3 w-3" />
                <p className="text-destructive text-xs">{error}</p>
              </>
            )}
          </div>
        )}
      </div>
    )
  },
)

SelectWithIcon.displayName = 'SelectWithIcon'
