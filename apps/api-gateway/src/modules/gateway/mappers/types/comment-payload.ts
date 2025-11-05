export type OutboundNewCommentMessage = {
  type: 'comment:new'
  title: string
  payload: {
    comment: {
      id: string
      taskId: string
      authorId: string
      author: {
        id: string
        name: string
        email: string
        avatarUrl: string | null
      }
      content: string
      createdAt: string
      updatedAt: string
    }
    assigneeIds: string[]
  }
}
