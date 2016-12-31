export const nameOfUser = (u) => {
  if (!u || (!u.first_name && !u.last_name)) {
    return 'Anonymous User'
  }
  return u.first_name + ' ' + u.last_name
}
