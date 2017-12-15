import * as types from '../../actions/types'
import invariant from 'invariant'
import isObjectLike from 'lodash/isObjectLike'

export const createTotalPages = type => (state = 0, action) => {
  // const onFetch = createOnFetchVars(type)
  if (type !== types.posts) {
    return state
  }

  switch (action.type) {
    case types.FETCH_POSTS_SUCCESS: {
      const { _paging } = action.response
      invariant(
        isObjectLike(_paging),
        `Expect the response to have a '_paging' prop.`
      )

      return Number(_paging.totalPages)
    }
    default:
      return state
  }
}
