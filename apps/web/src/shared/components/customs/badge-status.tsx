import clsx from 'clsx'
import { useMemo } from 'react'

import { Badge } from '../primitives/badge'

export type TaskStatusType = 'COMPLETED' | 'IN_PROGRESS' | 'BACKLOG' | 'DELAYED'

export interface BadgeStatusProps extends React.ComponentProps<'div'> {
  status?: TaskStatusType
  count?: number
  className?: string
}

const BadgeStatus = ({
  status = 'BACKLOG',
  count,
  className,
  ...rest
}: BadgeStatusProps) => {
  const variant: Record<TaskStatusType, { bg: string; title: string }> =
    useMemo(
      () => ({
        COMPLETED: {
          bg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
          title: 'Completed',
        },
        IN_PROGRESS: {
          bg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
          title: 'In Progress',
        },
        BACKLOG: {
          bg: 'bg-sky-500/15 text-sky-600 dark:text-sky-400',
          title: 'In Backlog',
        },
        DELAYED: {
          bg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
          title: 'Delayed',
        },
      }),
      [],
    )

  return (
    <Badge
      variant="secondary"
      className={clsx(
        'flex items-center gap-1 font-medium',
        className,
        variant[status].bg,
      )}
      {...rest}
    >
      {`${variant[status].title}${count ? `: ${count}` : ``}`}
    </Badge>
  )
}

export { BadgeStatus }
