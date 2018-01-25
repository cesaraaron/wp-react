import * as types from '../../actions/types'
import { createOnFetchVars } from '../../actions/types'

export const createIds = type => (state = [], action) => {
  const onFetch = createOnFetchVars(type)

  switch (action.type) {
    case onFetch.success: {
      const { result } = action.response

      return type === types.POSTS
        ? [...action.response.result]
        : [...state, ...result.filter(id => state.indexOf(id) < 0)]
    }
    default:
      return state
  }
}
