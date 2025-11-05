import { OutboundNewCommentMessage } from './types/comment-payload'

export const commentWsMapper = (
  data: OutboundNewCommentMessage,
  type: 'comment:new',
) => {
  console.log('[commentWsMapper]', JSON.stringify(data, null, 2))
  const comment = data.payload.comment

  const selectType = {
    'comment:new': {
      type: 'comment:new' as const,
      title: 'New comment',
      message: `${comment.author?.name ?? 'Someone'} created a new comment`,
    },
  }

  const notification = {
    type: selectType[type]?.type,
    title: selectType[type]?.title,
    message: selectType[type]?.message,
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
    recipients: data.payload.assigneeIds,
  }
}
