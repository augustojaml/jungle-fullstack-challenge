// src/app/tasks/components/task-detail-card.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { Task, TaskPriority, TaskStatus } from '@repo/types'
import { Link } from '@tanstack/react-router'
import { CalendarDaysIcon, SquarePenIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { BadgePriority } from '@/shared/components/customs/badge-priority'
import { BadgeStatus } from '@/shared/components/customs/badge-status'
import { CalendarWithIcon } from '@/shared/components/customs/calendar-with-icon'
import { InputWithIcon } from '@/shared/components/customs/input-with-icon'
import { ProcessMessage } from '@/shared/components/customs/process-message'
import { SelectWithIcon } from '@/shared/components/customs/select-with-icon'
import { TextareaWithIcon } from '@/shared/components/customs/text-area-with-icon'
import { Button } from '@/shared/components/primitives/button'
import { CardTitle } from '@/shared/components/primitives/card'
import { Separator } from '@/shared/components/primitives/separator'
import { formatDateBR } from '@/shared/helpers/format-date-br'
import { priorityOptions, statusOptions } from '@/shared/helpers/status-options'

import { useUpdateTaskMutation } from '../../react-query/use-update-task-mutation'
import { UpdateTaskDto, updateTaskSchema } from '../../schema/update-task-dto'
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
  const updateTaskMT = useUpdateTaskMutation(task?.id)

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<UpdateTaskDto>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task?.title,
      description: task?.description,
      priority: task?.priority,
      status: task?.status,
      // garante Date
      dueDate:
        task?.dueDate instanceof Date
          ? task.dueDate
          : task
            ? new Date(task.dueDate)
            : new Date(),
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (!task) return
    reset({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate:
        task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate),
    })
  }, [task, reset])

  // flags de edição inline
  const [editTitle, setEditTitle] = useState(false)
  const [editDesc, setEditDesc] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)

  const statusValue = watch('status')
  const priorityValue = watch('priority')

  const onSubmit = handleSubmit(async (data) => {
    await updateTaskMT.mutateAsync(data)
  })

  if (isLoading) return <TaskDetailPlaceholder />
  if (isError || !task) return <TaskDetailError />

  return (
    <ProcessMessage
      titleSuccess="Update task success"
      titleError="Update task error"
      successMessage={`Great! Task updated successfully ✏️✅`}
      isLoading={updateTaskMT.isPending}
      isSuccess={updateTaskMT.isSuccess}
      error={updateTaskMT.error}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pt-24">
        <header className="flex flex-col gap-4 space-y-4">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex h-9 items-center gap-2 rounded-md border px-3 text-sm">
              <CalendarDaysIcon className="text-muted-foreground h-4 w-4" />
              <span className="truncate">
                Due:{' '}
                <span className="text-foreground font-medium">
                  {formatDateBR(task.dueDate)}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <BadgePriority priority={priorityValue as TaskPriority} />
              <BadgeStatus status={statusValue as TaskStatus} />
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                {/* TITLE inline edit controlado pelo RHF */}
                <div className="flex items-start gap-2">
                  {!editTitle ? (
                    <>
                      <CardTitle className="leading-tight text-balance">
                        {watch('title')}
                      </CardTitle>

                      <button
                        type="button"
                        className="text-muted-foreground hover:bg-muted hover:text-foreground -mt-0.5 inline-flex rounded p-1"
                        aria-label="Edit title"
                        onClick={() => {
                          setEditTitle(true)
                          setTimeout(() => titleRef.current?.focus(), 0)
                        }}
                      >
                        <SquarePenIcon className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: true, minLength: 2 }}
                      render={({ field }) => (
                        <InputWithIcon
                          id="title"
                          ref={titleRef}
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          onBlur={() => setEditTitle(false)} // salva no blur
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditTitle(false) // salva
                            if (e.key === 'Escape') {
                              resetField('title') // volta ao default
                              setEditTitle(false)
                            }
                          }}
                          placeholder="Task title"
                          className="focus:ring-ring w-[min(80vw,48rem)] rounded border bg-transparent px-3 py-2 text-xl font-semibold outline-none focus:ring-2"
                          error={errors.title?.message}
                        />
                      )}
                    />
                  )}
                </div>

                <div className="flex items-start gap-2">
                  {!editDesc ? (
                    <>
                      <p className="text-muted-foreground max-w-4xl leading-relaxed">
                        {watch('description')}
                      </p>

                      <button
                        type="button"
                        className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex rounded p-1"
                        aria-label="Edit description"
                        onClick={() => {
                          setEditDesc(true)
                          setTimeout(() => descRef.current?.focus(), 0)
                        }}
                      >
                        <SquarePenIcon className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: true, minLength: 2 }}
                      render={({ field }) => (
                        <TextareaWithIcon
                          id="description"
                          ref={descRef}
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          onBlur={() => setEditDesc(false)} // salva no blur
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                              setEditDesc(false) // salva
                            }
                            if (e.key === 'Escape') {
                              resetField('description') // volta ao default
                              setEditDesc(false)
                            }
                          }}
                          rows={3}
                          placeholder="Task description"
                          className="focus:ring-ring w-full max-w-4xl rounded border bg-transparent px-3 py-2 leading-relaxed outline-none focus:ring-2"
                          error={errors.description?.message}
                        />
                      )}
                    />
                  )}
                </div>
              </div>

              <div className="inline-flex flex-wrap items-center gap-2">
                <Button asChild variant="outline" size="sm" className="h-9">
                  <Link to={`/`}>Back</Link>
                </Button>
                <Button size="sm" className="h-9" type="submit">
                  Update Task
                </Button>
              </div>
            </div>

            {/* Campos controlados pelo RHF */}
            <div className="grid gap-4 md:grid-cols-3">
              <Controller
                name="dueDate"
                control={control}
                render={({ field, fieldState }) => (
                  <CalendarWithIcon
                    id="dueDate"
                    label="Due date"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    error={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="priority"
                control={control}
                render={({ field, fieldState }) => (
                  <SelectWithIcon
                    id="priority"
                    name={field.name}
                    label="Priority"
                    options={priorityOptions}
                    placeholder="Select type..."
                    value={field.value ?? undefined}
                    onValueChange={field.onChange}
                    error={fieldState.error?.message}
                    defaultValue={task.priority}
                  />
                )}
              />

              <Controller
                name="status"
                control={control}
                render={({ field, fieldState }) => (
                  <SelectWithIcon
                    id="status"
                    name={field.name}
                    label="Status"
                    options={statusOptions}
                    placeholder="Select type..."
                    value={field.value ?? undefined}
                    onValueChange={field.onChange}
                    error={fieldState.error?.message}
                    defaultValue={task.status}
                  />
                )}
              />
            </div>
          </form>
        </header>

        <Separator className="-mt-4" />

        <TaskAssignees assignees={task.assignees} />

        <Separator className="mt-3" />

        <div className="scroll-content back h-full overflow-y-scroll bg-transparent">
          <div className="back h-full">
            <TaskComments taskId={task.id} />
          </div>
        </div>
      </div>
    </ProcessMessage>
  )
}

export { TaskDetail }
