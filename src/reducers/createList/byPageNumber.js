import * as types from '../../actions/types'
import invariant from 'invariant'

const isValidPageNumber = pageNumber => Number(pageNumber) > 0
const invalidPageNumber = pageNumber =>
  `Expect pageNumber to be a number > 0. Instead received: '${pageNumber}'`

export const createByPageNumber = type => (state = {}, action) => {
  if (!(type === types.posts || type === types.postsByCategory)) {
    return state
  }

  switch (action.type) {
    case types.FETCH_POSTS_SUCCESS:
    case types.FETCH_POSTS_BY_CATEGORY_SUCCESS: {
      const { pageNumber, response } = action

      invariant(isValidPageNumber(pageNumber), invalidPageNumber(pageNumber))

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
  invariant(isValidPageNumber(pageNumber), invalidPageNumber(pageNumber))

  return state[pageNumber] || []
}
