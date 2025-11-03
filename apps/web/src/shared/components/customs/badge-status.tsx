import { TaskStatus } from '@repo/types'
import clsx from 'clsx'
import { useMemo } from 'react'

import { Badge } from '../primitives/badge'

export interface BadgeStatusProps extends React.ComponentProps<'div'> {
  status?: TaskStatus | null | undefined
  count?: number
  className?: string
}

const VARIANT: Record<TaskStatus, { bg: string; title: string }> = {
  TODO: {
    bg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    title: 'To do',
  },
  IN_PROGRESS: {
    bg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    title: 'In Progress',
  },
  DONE: {
    bg: 'bg-sky-500/15 text-sky-600 dark:text-sky-400',
    title: 'In Review',
  },
  REVIEW: {
    bg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
    title: 'In Review',
  },
}

const safeStatus = (value: unknown): TaskStatus => {
  return value === 'DONE' ||
    value === 'IN_PROGRESS' ||
    value === 'REVIEW' ||
    value === 'TODO'
    ? value
    : 'TODO'
}

const BadgeStatus = ({
  status = 'TODO',
  count,
  className,
  ...rest
}: BadgeStatusProps) => {
  const key = safeStatus(status)
  const { bg, title } = useMemo(() => VARIANT[key], [key])

  return (
    <Badge
      variant="secondary"
      className={clsx('flex items-center gap-1 font-medium', className, bg)}
      {...rest}
    >
      {`${title}${count !== undefined ? `: ${count}` : ''}`}
    </Badge>
  )
}

export { BadgeStatus }
