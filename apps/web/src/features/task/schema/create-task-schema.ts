import { TASK_PRIORITY, TASK_STATUS } from '@repo/types'
import { z } from 'zod'

import { zodValidator } from '@/shared/helpers/zod-validator'

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required and cannot be empty.'),
  description: z
    .string()
    .min(1, 'Description is required and cannot be empty.'),
  dueDate: z
    .date({
      message: 'Date is required and cannot be empty.',
    })
    .refine(
      (d) => !Number.isNaN(d.getTime()),
      'Date is required and cannot be empty.',
    ),
  priority: zodValidator.enum('Priority', [...TASK_PRIORITY]),
  status: zodValidator.enum('Status', [...TASK_STATUS]),
  assigneeIds: z.array(z.string()).optional(),
})

export type CreateTaskDto = z.infer<typeof createTaskSchema>
