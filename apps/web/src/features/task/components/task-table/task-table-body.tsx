// src/app/tasks/tasks-page.tsx
import { Task } from '@repo/types'
import { Link } from '@tanstack/react-router'
import { CalendarDays, EyeIcon, Plus, Trash2, Users } from 'lucide-react'

import { BadgePriority } from '@/shared/components/customs/badge-priority'
import { BadgeStatus } from '@/shared/components/customs/badge-status'
import { ButtonWithLoading } from '@/shared/components/customs/button-with-loading'
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
import { formatDateBR } from '@/shared/helpers/format-date-br'
import { getInitialsLetterName } from '@/shared/helpers/get-initials-letter-name'

interface DataTable {
  tasks: Task[]
  total: number
  page: number
  size: number
}

interface TaskTableBodyProps {
  data?: DataTable
  onCreate?: () => void
}

const TaskTableBody = ({ data, onCreate }: TaskTableBodyProps) => {
  return (
    <div className="w-full">
      <Table className="w-full">
        <TableHeader className="bg-muted/60">
          <TableRow className="[&_th]:py-3">
            <TableHead className="min-w-[260px]">Task Name</TableHead>

            <TableHead className="min-w-[220px]">Created By</TableHead>
            <TableHead className="min-w-[140px]">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                Date
              </div>
            </TableHead>
            <TableHead className="min-w-[140px]">Priority</TableHead>
            <TableHead className="min-w-[140px]">Status</TableHead>
            <TableHead className="min-w-[120px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.tasks.map((task) => (
            <TableRow key={task.id} className="hover:bg-muted/30">
              <TableCell className="font-medium">{task.title}</TableCell>

              <TableCell>
                {task.creator ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="bg-primary/20 text-primary h-9 w-9 rounded-full">
                      <AvatarImage
                        src={task.creator?.avatarUrl || undefined}
                        alt={task.creator.name || task.creator.email || 'User'}
                        className="h-full w-full rounded-full"
                      />
                      <AvatarFallback className="h-full w-full rounded-full text-xs!">
                        {getInitialsLetterName({
                          name: task.creator.name,
                          email: task.creator.email,
                        })}
                      </AvatarFallback>
                    </Avatar>
                    <span>{task.creator.name}</span>
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

              <TableCell className="text-muted-foreground">
                {formatDateBR(task.dueDate, { timeStyle: 'short' })}
              </TableCell>

              <TableCell>
                <BadgePriority priority={task.priority} />
              </TableCell>

              <TableCell>
                <BadgeStatus status={task.status} />
              </TableCell>

              <TableCell className="text-right">
                <div className="inline-flex items-center gap-2">
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
                    <Link to="/task/$taskID" params={{ taskID: task.id }}>
                      <EyeIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data?.tasks.length === 0 && (
        <div className="flex flex-col justify-center space-y-4 p-8 text-center">
          <h2 className="text-foreground text-lg font-semibold">
            Welcome to your Task Board! 👋
          </h2>

          <p className="text-muted-foreground mx-auto mt-2 text-sm leading-relaxed">
            No task has been created yet. Here you can organize ideas, plan
            activities and track your day.
          </p>

          <ButtonWithLoading
            iconLeft={Plus}
            onClick={onCreate}
            className="mt-4 h-9 self-center px-4"
          >
            Create your first task
          </ButtonWithLoading>
        </div>
      )}
    </div>
  )
}

export { TaskTableBody }
