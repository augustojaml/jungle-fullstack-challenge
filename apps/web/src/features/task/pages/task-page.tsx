import { Task } from '@repo/types'
import { useState } from 'react'

import { useFindExceptCurrentQuery } from '@/features/auth/react-query/use-find-except-current-query'
import { TableError } from '@/features/task/components/task-table/table-error'
import { TableSkeleton } from '@/features/task/components/task-table/table-skeleton'
import { TaskTableBody } from '@/features/task/components/task-table/task-table-body'
import { TaskTableHeader } from '@/features/task/components/task-table/task-table-header'
import { DialogModal } from '@/shared/components/customs/dialog-modal'
import { ProcessMessage } from '@/shared/components/customs/process-message'
import { Separator } from '@/shared/components/primitives/separator'

import { CreateTaskModalForm } from '../components/create-task-modal-form'
import { DeleteTaskModal } from '../components/delete-task-modal-form'
import { TablePagination } from '../components/task-table/table-pagination'
import { useDeleteTaskMutation } from '../react-query/use-delete-task-mutation'
import { useFindTasksQuery } from '../react-query/use-find-tasks-query'

const TaskPage = () => {
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)

  const [openDeleteTaskModal, setOpenDeleteTaskModal] = useState(false)

  const deleteTaskMT = useDeleteTaskMutation()

  const onOpenTaskModal = (task: Task) => {
    setSelectedTask(task)
    setOpenDeleteTaskModal(true)
  }

  const handleDeleteTask = async () => {
    if (selectedTask) {
      await deleteTaskMT.mutateAsync(selectedTask.id)
      setSelectedTask(null)
      setOpenDeleteTaskModal(false)
    }
  }

  const {
    data: response,
    isLoading: responseLoading,
    isError: responseError,
    refetch: responseRefetch,
  } = useFindTasksQuery({ enabled: true, page, size })

  const { data: assignees } = useFindExceptCurrentQuery()

  if (responseLoading) {
    return (
      <div className="mx-auto h-[calc(100vh-4rem)] w-full max-w-7xl overflow-hidden px-10 pt-24">
        <TableSkeleton rows={6} />
      </div>
    )
  }

  return (
    <ProcessMessage
      titleSuccess="Delete task success"
      titleError="Delete task error"
      successMessage={`Task deleted successfully.`}
      isLoading={deleteTaskMT.isPending}
      isSuccess={deleteTaskMT.isSuccess}
      error={deleteTaskMT.error}
    >
      <div className="mx-auto h-full w-full max-w-7xl overflow-hidden px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mb-2 flex flex-col">
          <TaskTableHeader
            hasData={!!response?.tasks?.length}
            onOpen={() => setOpenCreateTaskModal(true)}
          />
          <div className="flex items-center justify-between">
            <div />
            {/* <div className="row-auto">
              <InputWithIcon
                id="search"
                icon={SearchIcon}
                placeholder="Search..."
                hiddenError
                width={300}
              />
            </div> */}

            <TablePagination
              total={response?.total}
              size={response?.size}
              page={response?.page}
              onPageChange={(newPage) => setPage(newPage)}
              onSizeChange={(newSize) => {
                setSize(newSize)
                setPage(1)
              }}
            />
          </div>
          <Separator className="my-4" />
        </div>
        {responseError ? (
          <TableError onRetry={responseRefetch} />
        ) : (
          <div className="scroll-content back h-full overflow-y-auto bg-transparent pb-20">
            <div className="border-muted/60 bg-card/90 overflow-hidden rounded-lg border pb-4">
              <TaskTableBody
                data={response}
                onCreate={() => setOpenCreateTaskModal(true)}
                onSeSelectTask={onOpenTaskModal}
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
          <CreateTaskModalForm
            onClose={() => setOpenCreateTaskModal(false)}
            assignees={assignees}
          />
        </DialogModal>

        <DeleteTaskModal
          open={openDeleteTaskModal}
          onOpenChange={setOpenDeleteTaskModal}
          taskTitle={selectedTask?.title}
          taskId={selectedTask?.id}
          isDeleting={false}
          onConfirm={handleDeleteTask}
        />
      </div>
    </ProcessMessage>
  )
}

export default TaskPage
