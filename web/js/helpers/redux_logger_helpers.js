import createLogger from 'redux-logger'

export default () => (
  createLogger({
    predicate: (getState, action) => (
      !([
        'redux-form'
      ].some((prefix) => (
        action.type.startsWith(prefix)
      )))
    )
  })
)
