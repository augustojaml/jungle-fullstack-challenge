// src/app/tasks/components/task-detail-card.tsx
import { Task } from '@repo/types'
import { Link } from '@tanstack/react-router'
import { CalendarDays, Flag, Users } from 'lucide-react'

import { BadgePriority } from '@/shared/components/customs/badge-priority'
import { BadgeStatus } from '@/shared/components/customs/badge-status'
import { CalendarWithIcon } from '@/shared/components/customs/calendar-with-icon'
import { SelectWithIcon } from '@/shared/components/customs/select-with-icon'
import { Button } from '@/shared/components/primitives/button'
import { CardTitle } from '@/shared/components/primitives/card'
import { Separator } from '@/shared/components/primitives/separator'
import { formatDateBR } from '@/shared/helpers/format-date-br'
import { priorityOptions, statusOptions } from '@/shared/helpers/status-options'

import { TaskAssignees } from './task-assignees'
import { TaskComments } from './task-comments'
import { TaskDetailError } from './task-detail-error'
import { TaskDetailPlaceholder } from './task-detail-placeholder'

interface TaskDetailProps {
  task?: Task
  isLoading?: boolean
  isError?: boolean
}

const TaskDetail = ({ task, isLoading, isError }: TaskDetailProps) => {
  if (isLoading) {
    return <TaskDetailPlaceholder />
  }

  if (isError || !task) {
    return <TaskDetailError />
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pt-24">
      <header className="flex flex-col gap-4 space-y-4">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="leading-tight text-balance">
              {task.title}
            </CardTitle>
            <p className="text-muted-foreground max-w-4xl leading-relaxed">
              {task.description}
            </p>
            <BadgeStatus status={task.status} />
          </div>

          <div className="inline-flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" size="sm" className="h-9">
              <Link to={`/`}>Back</Link>
            </Button>
            <Button size="sm" className="h-9">
              Mark as Done
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="flex h-9 items-center gap-2 rounded-md border px-3 text-sm">
            <CalendarDays className="text-muted-foreground h-4 w-4" />
            <span className="truncate">
              Due:{' '}
              <span className="text-foreground font-medium">
                {formatDateBR(task.dueDate, { timeStyle: 'short' })}
              </span>
            </span>
          </div>

          <div className="flex h-9 items-center gap-2 rounded-md border px-3 text-sm">
            <Flag className="text-muted-foreground h-4 w-4" />
            <BadgePriority priority={task.priority} />
          </div>

          <div className="flex h-9 items-center gap-2 rounded-md border px-3 text-sm">
            <Users className="text-muted-foreground h-4 w-4" />
            <span>
              Assignees:{' '}
              <span className="text-foreground font-medium">
                {task.assignees.length}
              </span>
            </span>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-3">
          <SelectWithIcon
            id="status"
            name="status"
            label="Status"
            options={statusOptions}
            placeholder="Select type..."
          />

          <SelectWithIcon
            id="status"
            name="priority"
            label="priority"
            options={priorityOptions}
            placeholder="Select type..."
          />

          <CalendarWithIcon id="dueDate" label="Due date" />
        </section>
      </header>

      <div className="back -mt-4 h-full">
        <TaskAssignees assignees={task.assignees} />

        <Separator className="my-6" />

        <Separator className="my-6" />

        <TaskComments comments={task.comments} />
      </div>
    </div>
  )
}

export { TaskDetail }
