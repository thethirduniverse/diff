export const truncatedContent = (content, limit) => {
  if (!content) {
    return ''
  }
  if (content.length <= limit) {
    return content
  }
  return content.substring(0, limit - 3) + '...'
}
