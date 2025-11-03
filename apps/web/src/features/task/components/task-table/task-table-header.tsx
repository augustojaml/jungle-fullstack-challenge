import { PlusIcon } from 'lucide-react'

import { ButtonWithLoading } from '@/shared/components/customs/button-with-loading'

interface TaskTableHeaderProps {
  hasData?: boolean
  onOpen: () => void
}

const TaskTableHeader = ({ hasData, onOpen }: TaskTableHeaderProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      {/* title + subtitle */}
      <div className="flex flex-col">
        <h2 className="text-foreground text-lg font-semibold">Task Overview</h2>

        <p className="text-muted-foreground text-xs">
          Manage your work, track priorities and move things forward.
        </p>
      </div>

      {/* button aligned right */}
      <ButtonWithLoading
        iconLeft={PlusIcon}
        disabled={!hasData}
        onClick={onOpen}
      >
        Create Task
      </ButtonWithLoading>
    </div>
  )
}

export { TaskTableHeader }
