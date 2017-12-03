import { createOnFetchVars } from '../../actions/types'

export const createIsFetching = type => (state = false, action) => {
  const onFetch = createOnFetchVars(type)
  switch (action.type) {
    case onFetch.request:
      return true
    case onFetch.success:
    case onFetch.failure:
      return false
    default:
      return state
  }
}
