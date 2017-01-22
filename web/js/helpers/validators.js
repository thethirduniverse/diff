import { isBlank } from 'helpers/string_helper'

export const editFormValidator = (data) => {
  const errors = {post: {}}
  if (!data.post || isBlank(data.post.content)) {
    errors.post.content = 'Content must not be empty.'
  }
  if (isBlank(data.message)) {
    errors.message = 'Message must not be empty.'
  }
  return errors
}

export const replyFormValidator = (data) => {
  const errors = {post: {}}
  if (!data.post || isBlank(data.post.content)) {
    errors.post.content = 'Content must not be empty.'
  }
  return errors
}
