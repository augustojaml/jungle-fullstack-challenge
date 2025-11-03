import { Comment } from '@repo/types'
import { MessageSquare, MessageSquareDashed } from 'lucide-react'

import { UserAvatar } from '@/shared/components/customs/user-avatar'
import { Button } from '@/shared/components/primitives/button'
import { Textarea } from '@/shared/components/primitives/textarea'
import { formatDateBR } from '@/shared/helpers/format-date-br'

interface TaskCommentProps {
  comments: Comment[]
}

const TaskComments = ({ comments = [] }: TaskCommentProps) => {
  const hasNone = comments.length === 0

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="text-muted-foreground h-4 w-4" />
        <h3 className="text-sm font-semibold">Comments</h3>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Textarea placeholder="Write a comment…" className="min-h-24 flex-1" />
        <Button className="h-9 sm:self-start">Comment</Button>
      </div>

      {hasNone ? (
        <div className="text-muted-foreground flex items-center gap-2 py-2 text-sm italic">
          <MessageSquareDashed className="h-4 w-4" />
          no comments yet — break the silence 👀
        </div>
      ) : (
        <div className="space-y-3.5">
          {comments.map((c) => (
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
    </section>
  )
}

export { TaskComments }
