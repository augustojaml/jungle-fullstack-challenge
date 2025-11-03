import { User } from '@repo/types'

import { UserAvatar } from '@/shared/components/customs/user-avatar'

interface TaskAssigneesProps {
  assignees: User[]
}

const TaskAssignees = ({ assignees }: TaskAssigneesProps) => {
  const hasNone = assignees.length === 0

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold">Assignees</h3>
      </div>

      {hasNone ? (
        <div className="text-muted-foreground flex items-center gap-2 px-0.5 text-xs italic">
          no one assigned — waiting for a brave soul to pick it up ⚡
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {assignees.map((a) => (
            <div
              key={a.id}
              className="bg-background/40 flex items-center gap-1.5 rounded-full border px-1.5 py-1 pr-3"
            >
              <UserAvatar
                user={{
                  name: a.name,
                  email: a.email,
                  avatarUrl: a.avatarUrl,
                }}
              />
              <span className="text-xs">{a.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export { TaskAssignees }
