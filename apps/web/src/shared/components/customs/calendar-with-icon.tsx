// src/shared/components/customs/calendar-with-icon.tsx
import { format } from 'date-fns'
import { Calendar as CalendarIcon, InfoIcon } from 'lucide-react'
import { forwardRef } from 'react'

import { cn } from '@/shared/libs/utils'

import { Button } from '../primitives/button'
import { Calendar } from '../primitives/calendar'
import { Label } from '../primitives/label'
import { Popover, PopoverContent, PopoverTrigger } from '../primitives/popover'

interface CalendarWithIconProps {
  id: string
  label?: string
  /** RHF Controller -> field.value (Date) */
  value?: Date
  /** RHF Controller -> field.onChange */
  onChange?: (date: Date) => void
  /** RHF Controller -> field.onBlur */
  onBlur?: () => void
  /** opcional (não é necessário para RHF) */
  name?: string
  placeholder?: string
  error?: string
  className?: string
  disabled?: boolean
  hiddenError?: boolean
}

export const CalendarWithIcon = forwardRef<
  HTMLButtonElement,
  CalendarWithIconProps
>(
  (
    {
      id,
      label,
      value,
      onChange,
      onBlur,
      name,
      placeholder = 'Pick a date',
      error,
      className,
      disabled,
      hiddenError = false,
    },
    ref,
  ) => {
    return (
      <div>
        <div className="space-y-1">
          {label && <Label htmlFor={id}>{label}</Label>}

          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  ref={ref}
                  type="button"
                  variant="outline"
                  disabled={disabled}
                  className={cn(
                    'w-full justify-start pl-9 text-left font-normal',
                    error && 'border-destructive!',
                    className,
                  )}
                  // dispara onBlur do RHF quando o trigger perde o foco (opcional)
                  onBlur={onBlur}
                  data-name={name}
                  id={id}
                >
                  {value ? format(value, 'PPP') : placeholder}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={value}
                  onSelect={(v) => {
                    if (!v) return
                    onChange?.(v)
                  }}
                  initialFocus
                />
              </PopoverContent>

              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <CalendarIcon className="text-muted-foreground h-4 w-4" />
              </span>
            </Popover>
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

CalendarWithIcon.displayName = 'CalendarWithIcon'
