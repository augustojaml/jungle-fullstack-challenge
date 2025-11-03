import { TaskPriority } from '@repo/types'
import clsx from 'clsx'
import { useMemo } from 'react'

import { Badge } from '../primitives/badge'

export interface BadgePriorityProps extends React.ComponentProps<'div'> {
  priority?: TaskPriority | null | undefined
  count?: number
  className?: string
}

// mapa estático e tipado
const VARIANT: Record<TaskPriority, { bg: string; title: string }> = {
  LOW: {
    bg: 'bg-slate-500/15 text-slate-600 dark:text-slate-400',
    title: 'Low',
  },
  MEDIUM: {
    bg: 'bg-teal-500/15 text-teal-600 dark:text-teal-400',
    title: 'Medium',
  },
  HIGH: {
    bg: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
    title: 'High',
  },
  URGENT: {
    bg: 'bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400',
    title: 'Urgent',
  },
}

const safePriority = (value: unknown): TaskPriority => {
  return value === 'LOW' ||
    value === 'MEDIUM' ||
    value === 'HIGH' ||
    value === 'URGENT'
    ? value
    : 'LOW'
}

const BadgePriority = ({
  priority = 'LOW',
  count,
  className,
  ...rest
}: BadgePriorityProps) => {
  const key = safePriority(priority)
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

export { BadgePriority }
