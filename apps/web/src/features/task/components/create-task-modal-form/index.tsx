import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { AssigneesMultiSelect } from '@/shared/components/customs/assignees-with-icon'
import { ButtonWithLoading } from '@/shared/components/customs/button-with-loading'
import { CalendarWithIcon } from '@/shared/components/customs/calendar-with-icon'
import { InputWithIcon } from '@/shared/components/customs/input-with-icon'
import { ProcessMessage } from '@/shared/components/customs/process-message'
import { SelectWithIcon } from '@/shared/components/customs/select-with-icon'
import { TextareaWithIcon } from '@/shared/components/customs/text-area-with-icon'
import { priorityOptions, statusOptions } from '@/shared/helpers/status-options'

import { useCreateTaskMutation } from '../../react-query/use-create-task-mutation'
import {
  CreateTaskDto,
  createTaskSchema,
} from '../../schema/create-task-schema'

export type AssigneeOption = {
  id: string
  name: string
  email?: string
}

interface CreateTaskModalFormProps {
  assignees?: AssigneeOption[]
  onClose: () => void
}

const CreateTaskModalForm = ({
  onClose,
  assignees = [],
}: CreateTaskModalFormProps) => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateTaskDto>({
    resolver: zodResolver(createTaskSchema),
  })

  const createTaskMT = useCreateTaskMutation()

  const onSubmitRequest = async (data: CreateTaskDto) => {
    await createTaskMT.mutateAsync(data)
    reset()
    onClose()
  }

  return (
    <ProcessMessage
      titleSuccess="Create task success"
      titleError="Create task error"
      successMessage={`Great! Your task is live now 🚀`}
      isLoading={createTaskMT.isPending}
      isSuccess={createTaskMT.isSuccess}
      error={createTaskMT.error}
    >
      <form onSubmit={handleSubmit(onSubmitRequest)} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <InputWithIcon
            id="title"
            label="Title"
            {...register('title')}
            error={errors.title?.message}
            disabled={createTaskMT.isPending}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <TextareaWithIcon
            id="description"
            label="description"
            {...register('description')}
            error={errors.description?.message}
            rows={10}
            disabled={createTaskMT.isPending}
          />
        </div>

        {/* row: Due Date / Priority / Status — grid 3 colunas */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Due Date */}
          <div className="space-y-2">
            <Controller
              name="dueDate"
              control={control}
              render={({ field, fieldState }) => (
                <CalendarWithIcon
                  id="dueDate"
                  label="Due date"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  error={fieldState.error?.message}
                  disabled={createTaskMT.isPending}
                />
              )}
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <SelectWithIcon
                  id="priority"
                  name={field.name}
                  label="Priority"
                  options={priorityOptions}
                  placeholder="Select type..."
                  value={field.value ?? undefined}
                  onValueChange={field.onChange}
                  error={errors.priority?.message}
                  disabled={createTaskMT.isPending}
                />
              )}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <SelectWithIcon
                  id="status"
                  name={field.name}
                  label="Status"
                  options={statusOptions}
                  placeholder="Select type..."
                  value={field.value ?? undefined}
                  onValueChange={field.onChange}
                  error={errors.status?.message}
                  disabled={createTaskMT.isPending}
                />
              )}
            />
          </div>
        </div>

        {/* Assignees (fake list por padrão) */}

        <Controller
          name="assigneeIds"
          control={control}
          render={({ field }) => (
            <AssigneesMultiSelect
              id="assigneeIds"
              name={field.name}
              placeholder={
                assignees.length === 0 ? 'No assignees' : 'Select assignees'
              }
              onBlur={field.onBlur}
              value={field.value ?? []}
              onChange={field.onChange}
              people={assignees}
              error={errors.assigneeIds?.message}
              disabled={createTaskMT.isPending || assignees.length === 0}
            />
          )}
        />

        <div className="flex justify-end space-x-4">
          <ButtonWithLoading
            variant="outline"
            type="button"
            disabled={createTaskMT.isPending}
            onClick={onClose}
          >
            Cancel
          </ButtonWithLoading>
          <ButtonWithLoading type="submit" disabled={createTaskMT.isPending}>
            Create Task
          </ButtonWithLoading>
        </div>
      </form>
    </ProcessMessage>
  )
}

export { CreateTaskModalForm }
