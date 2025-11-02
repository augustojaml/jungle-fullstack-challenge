import { format } from 'date-fns'
import { Calendar as CalendarIcon, Plus } from 'lucide-react'
import * as React from 'react'

import { Badge } from '@/shared/components/primitives/badge'
import { Button } from '@/shared/components/primitives/button'
import { Calendar } from '@/shared/components/primitives/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/primitives/command'
import { Input } from '@/shared/components/primitives/input'
import { Label } from '@/shared/components/primitives/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/primitives/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/primitives/select'
import { Textarea } from '@/shared/components/primitives/textarea'
import { cn } from '@/shared/libs/utils'

type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
type Status = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'

export type CreateTaskPayload = {
  title: string
  description: string
  dueDate: string // ISO
  priority: Priority
  status: Status
  assigneeIds: string[]
}

export type AssigneeOption = {
  id: string
  name: string
  email?: string
}

type Props = {
  onSubmit: (data: CreateTaskPayload) => void
  assignees?: AssigneeOption[]
}

/** ---- FAKE DATA (usado se não passar props.assignees) ---- */
const FAKE_ASSIGNEES: AssigneeOption[] = [
  {
    id: 'b7a02d3c-f81d-4608-90ee-b5dc98f7c302',
    name: 'Carla Souza',
    email: 'carla@acme.co',
  },
  {
    id: 'd095119e-a8f9-4850-8b25-8e486cf74044',
    name: 'Guilherme Lima',
    email: 'gui@acme.co',
  },
  {
    id: '7d5a4a1f-1a1b-4f2e-9a3b-111122223333',
    name: 'Leozinho',
    email: 'leo@acme.co',
  },
  {
    id: 'aa11bb22-cc33-dd44-ee55-666677778888',
    name: 'Cleble Ferrari',
    email: 'cleble@acme.co',
  },
  {
    id: '99998888-7777-6666-5555-444433332222',
    name: 'Gaby Martins',
    email: 'gaby@acme.co',
  },
]

const CreateTaskModalForm = ({ onSubmit, assignees = [] }: Props) => {
  const people = assignees.length ? assignees : FAKE_ASSIGNEES

  const [title, setTitle] = React.useState('Create responsive task cards')
  const [description, setDescription] = React.useState(
    'Implement grid layout and mobile breakpoints for task cards layout.',
  )
  const [date, setDate] = React.useState<Date>(new Date('2025-11-10'))
  const [priority, setPriority] = React.useState<Priority>('LOW')
  const [status, setStatus] = React.useState<Status>('TODO')
  const [assigneeIds, setAssigneeIds] = React.useState<string[]>(
    people.slice(0, 2).map((p) => p.id),
  )

  const toggleAssignee = (id: string) => {
    setAssigneeIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const selected = people.filter((a) => assigneeIds.includes(a.id))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      description,
      dueDate: date.toISOString(),
      priority,
      status,
      assigneeIds,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      {/* row: Due Date / Priority / Status — grid 3 colunas */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Due Date */}
        <div className="space-y-2">
          <Label>Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <Label>Priority</Label>
          <Select
            value={priority}
            onValueChange={(v: Priority) => setPriority(v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="URGENT">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={(v: Status) => setStatus(v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODO">To do</SelectItem>
              <SelectItem value="IN_PROGRESS">In progress</SelectItem>
              <SelectItem value="REVIEW">Review</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Assignees (fake list por padrão) */}
      <div className="space-y-2">
        <Label>Assignees</Label>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selected.length > 0
                ? `${selected.length} selected`
                : 'Select assignees'}
              <Plus className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No people found</CommandEmpty>
                <CommandGroup>
                  {people.map((a) => {
                    const isSelected = assigneeIds.includes(a.id)
                    return (
                      <CommandItem
                        key={a.id}
                        value={`${a.name} ${a.email ?? ''}`}
                        onSelect={() => toggleAssignee(a.id)}
                        className="flex items-center justify-between"
                      >
                        <span className="truncate">{a.name}</span>
                        {isSelected && (
                          <Badge variant="secondary" className="ml-2">
                            selected
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

        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selected.map((s) => (
              <Badge
                key={s.id}
                variant="secondary"
                className="flex items-center gap-1 pr-0"
                title={s.email ?? s.name}
              >
                <span className="truncate">{s.name}</span>
                <button
                  type="button"
                  aria-label={`Remove ${s.name}`}
                  className="hover:text-destructive px-1 text-xs"
                  onClick={() => toggleAssignee(s.id)}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  )
}

export { CreateTaskModalForm }
