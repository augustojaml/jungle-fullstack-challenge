import { z } from 'zod'

export const createTaskCommentSchema = z.object({
  content: z
    .string()
    .min(10, 'Your comment is too short. Please write at least 10 characters.'),
})

export type CreateTaskCommentDto = z.infer<typeof createTaskCommentSchema>
