import { zodResolver } from '@hookform/resolvers/zod'
import { MessageSquare, MessageSquareDashed } from 'lucide-react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { useCreateTaskCommentMutation } from '@/features/task/react-query/use-create-task-comment-mutation'
import { useFindTaskCommentsQuery } from '@/features/task/react-query/use-find-task-comments-query'
import {
  CreateTaskCommentDto,
  createTaskCommentSchema,
} from '@/features/task/schema/create-task-comment-schema'
import { ProcessMessage } from '@/shared/components/customs/process-message'
import { TextareaWithIcon } from '@/shared/components/customs/text-area-with-icon'
import { UserAvatar } from '@/shared/components/customs/user-avatar'
import { Button } from '@/shared/components/primitives/button'
import { formatDateBR } from '@/shared/helpers/format-date-br'

interface TaskCommentProps {
  taskId?: string
}

const TaskComments = ({ taskId }: TaskCommentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskCommentDto>({
    resolver: zodResolver(createTaskCommentSchema),
    mode: 'all',
  })

  const { data: response, isLoading } = useFindTaskCommentsQuery({ taskId })

  const createCommentMT = useCreateTaskCommentMutation(taskId || '')

  const onSubmit = handleSubmit(async (data) => {
    await createCommentMT.mutateAsync(data)
    reset()
  })

  const hasNone = useMemo(
    () => response?.comments?.length === 0,
    [response?.comments],
  )

  return (
    <ProcessMessage
      titleSuccess="Create task comment success"
      titleError="Create task comment error"
      successMessage={`Great! Your task comment is live now 🚀`}
      isLoading={createCommentMT.isPending}
      isSuccess={createCommentMT.isSuccess}
      error={createCommentMT.error}
    >
      <section className="flex flex-col space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-muted-foreground h-4 w-4" />
          <h3 className="text-sm font-semibold">Comments</h3>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex w-full flex-col gap-2 sm:flex-row"
        >
          <TextareaWithIcon
            id="content"
            {...register('content')}
            placeholder="Write a comment…"
            className="flex-1"
            error={errors.content?.message}
          />
          <Button className="h-9 sm:self-start" type="submit">
            Comment
          </Button>
        </form>

        {hasNone ? (
          <div className="text-muted-foreground flex items-center gap-2 py-2 text-sm italic">
            <MessageSquareDashed className="h-4 w-4" />
            no comments yet — break the silence 👀
          </div>
        ) : (
          <>
            {isLoading ? (
              <TaskCommentsPlaceholder />
            ) : (
              <div className="space-y-3.5">
                {response?.comments.map((c) => (
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
            )}
          </>
        )}
      </section>
    </ProcessMessage>
  )
}

interface TaskCommentsPlaceholderProps {
  size?: number
}

export function TaskCommentsPlaceholder({
  size = 3,
}: TaskCommentsPlaceholderProps) {
  return (
    <div className="space-y-3.5">
      {Array.from({ length: size }).map((_, i) => (
        <div
          key={i}
          className="bg-background/40 flex animate-pulse items-start gap-3 rounded-md border p-3.5"
        >
          {/* avatar fake */}
          <div className="bg-muted h-9 w-9 rounded-full" />

          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="bg-muted h-3 w-32 rounded" />
              <div className="bg-muted h-3 w-20 shrink-0 rounded" />
            </div>
            <div className="bg-muted h-3 w-full max-w-[85%] rounded" />
            <div className="bg-muted h-3 w-full max-w-[65%] rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export { TaskComments }
