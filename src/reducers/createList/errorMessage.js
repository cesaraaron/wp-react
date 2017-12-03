import { createOnFetchVars } from '../../actions/types'

export const createErrorMessage = type => (state = null, action) => {
  const onFetch = createOnFetchVars(type)

  switch (action.type) {
    case onFetch.failure:
      return action.message
    case onFetch.success:
      return null
    default:
      return state
  }
}
