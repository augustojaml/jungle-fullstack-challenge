import { InfoIcon, Users, X } from 'lucide-react'
import { forwardRef, useRef, useState } from 'react'

import { Badge } from '../primitives/badge'
import { Button } from '../primitives/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../primitives/command'
import { Label } from '../primitives/label'
import { Popover, PopoverContent, PopoverTrigger } from '../primitives/popover'

interface AssigneeOption {
  id: string
  name: string
  email?: string
}

interface AssigneesMultiSelectProps {
  id: string
  name?: string
  onBlur?: () => void
  value: string[]
  onChange: (ids: string[]) => void
  people: AssigneeOption[]
  label?: string
  error?: string
  hiddenError?: boolean
  placeholder?: string
  disabled?: boolean
}

export const AssigneesMultiSelect = forwardRef<
  HTMLInputElement,
  AssigneesMultiSelectProps
>(
  (
    {
      id,
      name,
      onBlur,
      label,
      value = [],
      onChange,
      people,
      error,
      hiddenError = false,
      placeholder = 'Select assignees',
      disabled = false,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false)
    const triggerRef = useRef<HTMLButtonElement | null>(null)

    const toggleAssignee = (assigneeId: string) => {
      const newValue = value.includes(assigneeId)
        ? value.filter((id) => id !== assigneeId)
        : [...value, assigneeId]
      onChange(newValue)
    }

    const removeAssignee = (assigneeId: string) => {
      onChange(value.filter((id) => id !== assigneeId))
    }

    const selectedPeople = people.filter((p) => value.includes(p.id))
    const hasError = Boolean(error)

    return (
      <div className="w-full space-y-2 bg-transparent">
        <input
          ref={ref}
          name={name}
          onBlur={onBlur}
          type="hidden"
          value={JSON.stringify(value)}
          aria-hidden="true"
        />

        {label && (
          <Label htmlFor={id} className={hasError ? 'text-destructive' : ''}>
            {label}
          </Label>
        )}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={triggerRef}
              id={id}
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-invalid={hasError}
              aria-describedby={hasError ? `${id}-error` : undefined}
              disabled={disabled}
              className={`bg-background dark:bg-background/30! w-full justify-between ${hasError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            >
              <span className="flex items-center gap-2 overflow-hidden">
                <Users className="text-muted-foreground h-4 w-4 shrink-0" />
                <span className="truncate">
                  {selectedPeople.length > 0
                    ? `${selectedPeople.length} assignee${selectedPeople.length > 1 ? 's' : ''} selected`
                    : placeholder}
                </span>
              </span>
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-(--radix-popover-trigger-width) p-0"
            align="start"
          >
            <Command>
              <CommandInput placeholder="Search people..." />
              <CommandList>
                <CommandEmpty>No people found.</CommandEmpty>
                <CommandGroup>
                  {people.map((person) => {
                    const isSelected = value.includes(person.id)
                    return (
                      <CommandItem
                        key={person.id}
                        value={`${person.name} ${person.email ?? ''}`}
                        onSelect={() => {
                          toggleAssignee(person.id)
                          setOpen(false)
                          setTimeout(() => triggerRef.current?.focus(), 0)
                        }}
                        className="flex cursor-pointer items-center justify-between"
                      >
                        <div className="flex flex-col overflow-hidden">
                          <span className="truncate font-medium">
                            {person.name}
                          </span>
                          {person.email && (
                            <span className="text-muted-foreground truncate text-xs">
                              {person.email}
                            </span>
                          )}
                        </div>
                        {isSelected && (
                          <Badge variant="secondary" className="ml-2 shrink-0">
                            Selected
                          </Badge>
                        )}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {selectedPeople.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedPeople.map((person) => (
              <Badge
                key={person.id}
                variant="secondary"
                className="flex max-w-full items-center gap-1.5 pr-1"
                title={person.email ?? person.name}
              >
                <span className="truncate">{person.name}</span>
                <button
                  type="button"
                  aria-label={`Remove ${person.name}`}
                  disabled={disabled}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    removeAssignee(person.id)
                  }}
                  className="focus:ring-ring rounded-sm opacity-70 hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {!hiddenError && hasError && (
          <div
            id={`${id}-error`}
            className="text-destructive flex items-center gap-2"
            role="alert"
          >
            <InfoIcon className="h-3 w-3 shrink-0" />
            <p className="text-xs">{error}</p>
          </div>
        )}
      </div>
    )
  },
)

AssigneesMultiSelect.displayName = 'AssigneesMultiSelect'
