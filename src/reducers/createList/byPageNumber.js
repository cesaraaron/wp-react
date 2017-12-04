import * as types from '../../actions/types'
// import { createOnFetchVars } from '../../actions/types'

const isValidPageNumber = val => typeof val === 'number' || val > 0
const createErrorForValue = val =>
  new Error(`Expect pageNumber to be a number > 0. Instead received '${val}'`)

export const createByPageNumber = type => (state = {}, action) => {
  if (!(type === types.posts || type === types.postsByCategory)) {
    return state
  }

  switch (action.type) {
    case types.FETCH_POSTS_SUCCESS:
    case types.FETCH_POSTS_BY_CATEGORY_SUCCESS: {
      const { pageNumber, response } = action

      if (!isValidPageNumber(pageNumber)) {
        throw createErrorForValue(pageNumber)
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

export const getPostsByPage = (state, pageNumber) => {
  if (!isValidPageNumber(pageNumber)) {
    throw createErrorForValue(pageNumber)
  }
  return state[pageNumber] || []
}
