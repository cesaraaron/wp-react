import { createOnFetchVars } from '../../actions/types'

export const createById = type => (state = {}, action) => {
  const onFetch = createOnFetchVars(type)
  switch (action.type) {
    case onFetch.success:
      return {
        ...state,
        ...action.response.entities.post
      }
    default:
      return state
  }
}
