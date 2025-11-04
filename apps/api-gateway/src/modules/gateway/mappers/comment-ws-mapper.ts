import { Comment } from '@repo/types'

interface CommetWsMapperProps {
  comment: Comment
  type: 'created' | 'updated'
}

export const commentWsMapper = ({ comment, type }: CommetWsMapperProps) => {
  const selectType = {
    created: {
      type: 'comment:new' as const,
      title: 'New comment',
      message: `${comment.author?.name ?? 'Someone'} created a new comment`,
    },
    updated: {
      type: 'comment:update' as const,
      title: 'Comment updated',
      message: `${comment.author?.name ?? 'Someone'} updated a comment`,
    },
  }

  const notification = {
    type: selectType[type].type,
    title: selectType[type].title,
    message: selectType[type].message,
    data: {
      commentId: comment.id,
      taskId: comment.taskId,
      authorId: comment.authorId,
      authorName: comment.author?.name ?? '',
      content: comment.content,
    },
  }

  return {
    notification,
  }
}
