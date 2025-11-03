import { TASK_PRIORITY, TASK_STATUS } from '@repo/types'
import { z } from 'zod'

import { zodValidator } from '@/shared/helpers/zod-validator'

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required and cannot be empty.').optional(),
  description: z
    .string()
    .min(1, 'Description is required and cannot be empty.')
    .optional(),
  dueDate: z
    .date({
      message: 'Date is required and cannot be empty.',
    })
    .refine(
      (d) => !Number.isNaN(d.getTime()),
      'Date is required and cannot be empty.',
    )
    .optional(),
  priority: zodValidator.enum('Priority', [...TASK_PRIORITY]).optional(),
  status: zodValidator.enum('Status', [...TASK_STATUS]),
})

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>
