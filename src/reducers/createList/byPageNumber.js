import * as types from '../../actions/types'
// import { createOnFetchVars } from '../../actions/types'

export const createByPageNumber = type => (state = {}, action) => {
  if (type !== types.posts) {
    return state
  }

  switch (action.type) {
    case types.FETCH_POSTS_SUCCESS: {
      const { pageNumber, response } = action

      if (typeof pageNumber !== 'number' || pageNumber <= 0) {
        throw new Error(
          `Expect pageNumber to be a number > 0. Instead received ${pageNumber}`
        )
      }

      return {
        ...state,
        [pageNumber]: response.result.map(id => response.entities.post[id])
      }
    }
    default:
      return state
  }
}
