import { useState } from 'react'

import { TableError } from '@/features/task/components/task-table/table-error'
import { TableSkeleton } from '@/features/task/components/task-table/table-skeleton'
import { TaskTableBody } from '@/features/task/components/task-table/task-table-body'
import { TaskTableHeader } from '@/features/task/components/task-table/task-table-header'
import { DialogModal } from '@/shared/components/customs/dialog-modal'

import { CreateTaskModalForm } from '../components/create-task-modal-form'
import { useFindTasksQuery } from '../react-query/use-find-tasks-query'

const TaskPage = () => {
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false)

  const {
    data: response,
    isLoading: responseLoading,
    isError: responseError,
    refetch: responseRefetch,
  } = useFindTasksQuery({ enabled: true })

  if (responseLoading) {
    return (
      <div className="mx-auto h-[calc(100vh-4rem)] w-full max-w-7xl overflow-hidden px-10 pt-24">
        <TableSkeleton rows={6} />
      </div>
    )
  }

  return (
    <div className="mx-auto h-[calc(100vh-4rem)] w-full max-w-7xl overflow-hidden px-10 pt-24">
      <TaskTableHeader
        hasData={!!response?.tasks?.length}
        onOpen={() => setOpenCreateTaskModal(true)}
      />
      {responseError ? (
        <TableError onRetry={responseRefetch} />
      ) : (
        <div className="scroll-content back h-full overflow-y-scroll bg-transparent">
          <div className="border-muted/60 bg-card/90 overflow-hidden rounded-lg border">
            <TaskTableBody
              data={response}
              onCreate={() => setOpenCreateTaskModal(true)}
            />
          </div>
        </div>
      )}
      <DialogModal
        title="Create Your Next Task"
        description="Turn your ideas into actions by defining details, deadline and ownership."
        open={openCreateTaskModal}
        size="xxl"
        onOpenChange={setOpenCreateTaskModal}
      >
        <CreateTaskModalForm onClose={() => setOpenCreateTaskModal(false)} />
      </DialogModal>
    </div>
  )
}

export default TaskPage
