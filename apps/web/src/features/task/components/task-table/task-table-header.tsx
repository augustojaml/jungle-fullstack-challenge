import { PlusIcon } from 'lucide-react'

import { ButtonWithLoading } from '@/shared/components/customs/button-with-loading'

interface TaskTableHeaderProps {
  hasData?: boolean
  onOpen: () => void
}

const TaskTableHeader = ({ hasData, onOpen }: TaskTableHeaderProps) => {
  return (
    <div className="mb-4 flex items-center justify-end gap-4">
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
