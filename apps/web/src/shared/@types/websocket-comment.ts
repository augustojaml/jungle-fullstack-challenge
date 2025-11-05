export interface Data {
  commentId: string
  taskId: string
  authorId: string
  authorName: string
  content: string
}

export interface WebSocketComment {
  type: string
  title: string
  message: string
  data: Data
}
