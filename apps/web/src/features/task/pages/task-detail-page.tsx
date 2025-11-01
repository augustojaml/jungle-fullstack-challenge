// src/app/tasks/components/task-detail-card.tsx
import { Link } from '@tanstack/react-router'
import { CalendarDays, Flag, MessageSquare, Plus, Users } from 'lucide-react'
import { ChangeEvent, useMemo, useState } from 'react'

import {
  BadgeStatus,
  TaskStatusType,
} from '@/shared/components/customs/badge-status'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/primitives/avatar'
import { Badge } from '@/shared/components/primitives/badge'
import { Button } from '@/shared/components/primitives/button'
import { CardTitle } from '@/shared/components/primitives/card'
import { Input } from '@/shared/components/primitives/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/primitives/select'
import { Separator } from '@/shared/components/primitives/separator'
import { Textarea } from '@/shared/components/primitives/textarea'

type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

type Comment = {
  id: string
  author: { name: string; avatar?: string }
  createdAt: string
  text: string
}

type Assignee = { id: string; name: string; avatar?: string }

type TaskDetail = {
  id: string
  title: string
  description?: string
  dueDate?: string
  priority: Priority
  status: TaskStatusType
  assignees: Assignee[]
  comments: Comment[]
}

const PRIORITY_STYLES: Record<Priority, string> = {
  LOW: 'bg-sky-500/15 text-sky-600 dark:text-sky-400',
  MEDIUM: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  HIGH: 'bg-orange-500/15 text-orange-600 dark:text-orange-400',
  URGENT: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
}

const TaskDetailPage = () => {
  // mock inicial
  const initialTask = useMemo<TaskDetail>(
    () => ({
      id: 't-1',
      title: 'Create new landing page',
      description:
        'Design hero section, features grid and pricing. Align with brand tokens and responsive breakpoints.',
      dueDate: '2025-11-15',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      assignees: [
        { id: 'u1', name: 'Zaire Donin' },
        { id: 'u2', name: 'Allison Curtis' },
      ],
      comments: [
        {
          id: 'c1',
          author: { name: 'Zaire Donin' },
          createdAt: '2025-10-31 10:15',
          text: 'I pushed the first draft of the hero section.',
        },
        {
          id: 'c2',
          author: { name: 'Allison Curtis' },
          createdAt: '2025-10-31 12:40',
          text: 'Starting features illustrations today.',
        },
      ],
    }),
    [],
  )

  const [task, setTask] = useState<TaskDetail>(initialTask)
  const [newComment, setNewComment] = useState('')
  const [newAssignee, setNewAssignee] = useState('')

  const addComment = () => {
    if (!newComment.trim()) return
    const c: Comment = {
      id: crypto.randomUUID(),
      author: { name: 'You' },
      createdAt: new Date().toLocaleString(),
      text: newComment.trim(),
    }
    setTask((t) => ({ ...t, comments: [c, ...t.comments] }))
    setNewComment('')
  }

  const addAssignee = () => {
    if (!newAssignee.trim()) return
    const a: Assignee = { id: crypto.randomUUID(), name: newAssignee.trim() }
    setTask((t) => ({ ...t, assignees: [...t.assignees, a] }))
    setNewAssignee('')
  }

  const removeAssignee = (id: string) =>
    setTask((t) => ({
      ...t,
      assignees: t.assignees.filter((a) => a.id !== id),
    }))

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-7xl flex-col gap-6 px-6 pt-24">
      {/* HEADER — respiro melhor e linhas mais curtas */}
      <header className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="leading-tight text-balance">
              {task.title}
            </CardTitle>
            <p className="text-muted-foreground max-w-4xl leading-relaxed">
              {task.description}
            </p>
          </div>

          {/* badge status à direita, mesma densidade das tags */}
          <BadgeStatus status={task.status} />
        </div>

        {/* meta chips com altura consistente (h-9) */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="flex h-9 items-center gap-2 rounded-md border px-3 text-sm">
            <CalendarDays className="text-muted-foreground h-4 w-4" />
            <span className="truncate">
              Due:{' '}
              <span className="text-foreground font-medium">
                {task.dueDate ?? '—'}
              </span>
            </span>
          </div>
          <div className="flex h-9 items-center gap-2 rounded-md border px-3 text-sm">
            <Flag className="text-muted-foreground h-4 w-4" />
            <Badge className={`px-2.5 py-1 ${PRIORITY_STYLES[task.priority]}`}>
              {task.priority}
            </Badge>
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

      {/* CONTEÚDO ROLÁVEL — respiro interno + ritmo vertical */}
      <div className="scroll-content back h-full overflow-y-auto rounded-lg border p-4 md:p-6">
        <section className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-sm font-semibold">Assignees</h3>

            <div className="flex flex-wrap gap-2">
              <Input
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value)}
                placeholder="Add member by name"
                className="h-9 w-56"
              />
              <Button size="sm" onClick={addAssignee} className="h-9">
                <Plus className="mr-1 h-4 w-4" />
                Add
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {task.assignees.map((a) => (
              <div
                key={a.id}
                className="bg-background/40 flex items-center gap-2 rounded-full border px-2.5 py-1.5"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={a.avatar ?? ''} />
                  <AvatarFallback>
                    {a.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{a.name}</span>
                <button
                  onClick={() => removeAssignee(a.id)}
                  className="text-muted-foreground hover:text-foreground rounded-full p-1"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
            {task.assignees.length === 0 && (
              <p className="text-muted-foreground text-sm">No assignees yet.</p>
            )}
          </div>
        </section>

        <Separator className="my-6" />

        {/* QUICK EDIT (status/priority/due date) com espaçamentos coesos */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label className="text-muted-foreground block text-xs">
              Status
            </label>
            <Select
              value={task.status}
              onValueChange={(v: TaskStatusType) =>
                setTask((t) => ({ ...t, status: v }))
              }
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DELAYED">DELAYED</SelectItem>
                <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                <SelectItem value="BACKLOG">BACKLOG</SelectItem>
                <SelectItem value="COMPLETED">COMPLETED</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-muted-foreground block text-xs">
              Priority
            </label>
            <Select
              value={task.priority}
              onValueChange={(v: Priority) =>
                setTask((t) => ({ ...t, priority: v }))
              }
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">LOW</SelectItem>
                <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                <SelectItem value="HIGH">HIGH</SelectItem>
                <SelectItem value="URGENT">URGENT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-muted-foreground block text-xs">
              Due date
            </label>
            <Input
              type="date"
              className="h-9"
              value={task.dueDate ?? ''}
              onChange={(e) =>
                setTask((t) => ({
                  ...t,
                  dueDate: e.target.value || undefined,
                }))
              }
            />
          </div>
        </section>

        <Separator className="my-6" />

        {/* COMMENTS com linhas mais soltas e botões alinhados */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-muted-foreground h-4 w-4" />
            <h3 className="text-sm font-semibold">Comments</h3>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Textarea
              placeholder="Write a comment…"
              className="min-h-24 flex-1"
              value={newComment}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setNewComment(e.target.value)
              }
            />
            <Button onClick={addComment} className="h-9 sm:self-start">
              Comment
            </Button>
          </div>

          <div className="space-y-3.5">
            {task.comments.map((c) => (
              <div
                key={c.id}
                className="bg-background/40 flex items-start gap-3 rounded-md border p-3.5"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback>{c.author.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-medium">
                      {c.author.name}
                    </p>
                    <span className="text-muted-foreground shrink-0 text-xs">
                      {c.createdAt}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))}
            {task.comments.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No comments yet. Be the first to comment.
              </p>
            )}
          </div>
        </section>

        <Separator className="my-6" />

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

export default TaskDetailPage
