// src/app/tasks/components/task-detail-card.tsx
import { Task } from '@repo/types'
import { Link } from '@tanstack/react-router'
import { CalendarDays, Flag, MessageSquare, Users } from 'lucide-react'

import { BadgePriority } from '@/shared/components/customs/badge-priority'
import { BadgeStatus } from '@/shared/components/customs/badge-status'
import { CalendarWithIcon } from '@/shared/components/customs/calendar-with-icon'
import { SelectWithIcon } from '@/shared/components/customs/select-with-icon'
import { UserAvatar } from '@/shared/components/customs/user-avatar'
import { Button } from '@/shared/components/primitives/button'
import { CardTitle } from '@/shared/components/primitives/card'
import { Separator } from '@/shared/components/primitives/separator'
import { Textarea } from '@/shared/components/primitives/textarea'
import { formatDateBR } from '@/shared/helpers/format-date-br'
import { priorityOptions, statusOptions } from '@/shared/helpers/status-options'

interface TaskDetailProps {
  task: Task
}

const TaskDetail = ({ task }: TaskDetailProps) => {
  // --- dados estáticos simulando uma task ---

  return (
    <div className="mx-auto flex h-[calc(100vh-2rem)] w-full max-w-7xl flex-col gap-6 px-6 pt-24">
      {/* HEADER */}
      <header className="flex flex-col gap-4">
        {/* título + descrição + status */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="leading-tight text-balance">
              {task.title}
            </CardTitle>
            <p className="text-muted-foreground max-w-4xl leading-relaxed">
              {task.description}
            </p>
          </div>

          {/* badge status à direita */}
          <BadgeStatus status={task.status} />
        </div>

        {/* meta chips */}
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
      </header>

      {/* CONTENT ROLLABLE */}
      <div className="scroll-content back h-full overflow-y-auto rounded-lg border p-4 md:p-6">
        {/* ASSIGNEES */}
        <section className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-sm font-semibold">Assignees</h3>
          </div>

          {/* list assignees */}
          <div className="flex flex-wrap gap-2.5">
            {task.assignees.map((a) => (
              <div
                key={a.id}
                className="bg-background/40 flex items-center gap-2 rounded-full border px-2 py-1.5 pr-4"
              >
                <UserAvatar
                  user={{
                    name: a.name,
                    email: a.email,
                    avatarUrl: a.avatarUrl,
                  }}
                />
                <span className="text-sm">{a.name}</span>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-6" />

        {/* QUICK EDIT */}
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

        <Separator className="my-6" />

        {/* COMMENTS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-muted-foreground h-4 w-4" />
            <h3 className="text-sm font-semibold">Comments</h3>
          </div>

          {/* campo e botão fake */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Textarea
              placeholder="Write a comment…"
              className="min-h-24 flex-1"
            />
            <Button className="h-9 sm:self-start">Comment</Button>
          </div>

          {/* lista de comentários */}
          <div className="space-y-3.5">
            {task.comments.map((c) => (
              <div
                key={c.id}
                className="bg-background/40 flex items-start gap-3 rounded-md border p-3.5"
              >
                <UserAvatar user={c.author} />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-medium">
                      {c.author?.name}
                    </p>
                    <span className="text-muted-foreground shrink-0 text-xs">
                      {formatDateBR(c.createdAt, { timeStyle: 'short' })}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-6" />

        {/* FOOTER */}
        <div className="flex w-full flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-muted-foreground text-xs">
            Task ID: <span className="text-foreground">{task.id}</span>
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
      </div>
    </div>
  )
}

export { TaskDetail }
