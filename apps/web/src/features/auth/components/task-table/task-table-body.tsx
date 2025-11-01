// src/app/tasks/tasks-page.tsx
import { Link } from '@tanstack/react-router'
import { CalendarDays, EyeIcon, Pencil, Trash2, Users } from 'lucide-react'

import { BadgeStatus } from '@/shared/components/customs/badge-status'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/primitives/avatar'
import { Button } from '@/shared/components/primitives/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/primitives/table'

export type Status = 'COMPLETED' | 'IN_PROGRESS' | 'BACKLOG' | 'DELAYED'
export type Task = {
  id: string
  title: string
  team: string
  assignee?: { name: string; avatar?: string }
  date: string // ISO ou já formatada
  status: Status
}

export const STATUS_STYLES: Record<Status, string> = {
  COMPLETED: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  IN_PROGRESS: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  BACKLOG: 'bg-sky-500/15 text-sky-600 dark:text-sky-400',
  DELAYED: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
}

interface TaskTableBodyProps {
  tasks: Task[]
}

const TaskTableBody = ({ tasks = [] }: TaskTableBodyProps) => {
  return (
    <Table className="w-full">
      <TableHeader className="bg-muted/60">
        <TableRow className="[&_th]:py-3">
          <TableHead className="min-w-[260px]">Task Name</TableHead>

          <TableHead className="min-w-[220px]">Assigned To</TableHead>
          <TableHead className="min-w-[140px]">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              Date
            </div>
          </TableHead>
          <TableHead className="min-w-[140px]">Status</TableHead>
          <TableHead className="min-w-[120px] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {tasks.map((t) => (
          <TableRow key={t.id} className="hover:bg-muted/30">
            <TableCell className="font-medium">{t.title}</TableCell>

            <TableCell>
              {t.assignee ? (
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={t.assignee.avatar ?? ''} />
                    <AvatarFallback>
                      {t.assignee.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{t.assignee.name}</span>
                </div>
              ) : (
                <button
                  className="text-primary inline-flex items-center gap-1 text-sm font-medium"
                  onClick={() => alert('Add member')}
                >
                  <Users className="h-4 w-4" />
                  ADD MEMBER
                </button>
              )}
            </TableCell>

            <TableCell className="text-muted-foreground">{t.date}</TableCell>

            <TableCell>
              <BadgeStatus status={t.status} />
            </TableCell>

            <TableCell className="text-right">
              <div className="inline-flex items-center gap-2">
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="text-destructive hover:text-destructive h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <Button
                  asChild
                  size="icon"
                  variant="outline"
                  className="text-primary hover:text-destructive h-8 w-8"
                >
                  <Link to="/task/$taskID" params={{ taskID: t.id }}>
                    <EyeIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}

        {tasks.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-muted-foreground py-8 text-center text-sm"
            >
              No tasks yet — click{' '}
              <span className="text-foreground font-medium">Create Task</span>{' '}
              to add one.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export { TaskTableBody }
