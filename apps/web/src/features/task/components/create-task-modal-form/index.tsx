import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { AssigneesMultiSelect } from '@/shared/components/customs/assignees-with-icon'
import { ButtonWithLoading } from '@/shared/components/customs/button-with-loading'
import { CalendarWithIcon } from '@/shared/components/customs/calendar-with-icon'
import { InputWithIcon } from '@/shared/components/customs/input-with-icon'
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

const FAKE_ASSIGNEES: AssigneeOption[] = [
  {
    id: 'b7a02d3c-f81d-4608-90ee-b5dc98f7c302',
    name: 'Carla Souza',
    email: 'carla@acme.co',
  },
  {
    id: 'd095119e-a8f9-4850-8b25-8e486cf74044',
    name: 'Guilherme Lima',
    email: 'gui@acme.co',
  },
  {
    id: '7d5a4a1f-1a1b-4f2e-9a3b-111122223333',
    name: 'Leozinho',
    email: 'leo@acme.co',
  },
  {
    id: 'aa11bb22-cc33-dd44-ee55-666677778888',
    name: 'Cleble Ferrari',
    email: 'cleble@acme.co',
  },
  {
    id: '99998888-7777-6666-5555-444433332222',
    name: 'Gaby Martins',
    email: 'gaby@acme.co',
  },
]

interface CreateTaskModalFormProps {
  onClose: () => void
}

const CreateTaskModalForm = ({ onClose }: CreateTaskModalFormProps) => {
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
            onBlur={field.onBlur}
            value={field.value ?? []}
            onChange={field.onChange}
            people={FAKE_ASSIGNEES}
            error={errors.assigneeIds?.message}
            disabled={createTaskMT.isPending}
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
  )
}

export { CreateTaskModalForm }
