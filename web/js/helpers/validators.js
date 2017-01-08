import { isBlank } from 'helpers/string_helper'

export const editFormValidator = (data) => {
  const errors = {post: {}}
  if (isBlank(data.post.content)) {
    errors.post.content = 'Content must not be empty.'
  }
  if (isBlank(data.message)) {
    errors.message = 'Message must not be empty.'
  }
  return errors
}
