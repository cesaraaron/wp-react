import * as types from '../../actions/types'
// import { createOnFetchVars } from '../../actions/types'

export const createTotalPages = type => (state = 0, action) => {
  // const onFetch = createOnFetchVars(type)
  if (type !== types.posts) {
    return state
  }

  switch (action.type) {
    case types.FETCH_POSTS_SUCCESS: {
      const { _paging } = action.response
      if (
        !_paging ||
        Object.prototype.toString.call(_paging) !== '[object Object]'
      ) {
        throw new Error(
          `Expect the action.response to have a '_paging' object prop.`
        )
      }
      return Number(action.response._paging.totalPages)
    }
    default:
      return state
  }
}
