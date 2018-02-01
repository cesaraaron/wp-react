import * as types from '../../actions/types'
import invariant from 'invariant'

const INVALID_PAGE_NUMBER = 'Invalid page number'

export const createIdsByPage = type => (state = {}, action) => {
  const { response, pageNumber } = action
  const onFetch = types.createOnFetchVars(type)

  switch (action.type) {
    case onFetch.success:
      return Number(pageNumber) > 0
        ? {
            ...state,
            [pageNumber]: response.result
          }
        : state
    default:
      return state
  }
}

export const getPostsForPage = ({ state, pageNumber, byId }) => {
  invariant(Number(pageNumber), INVALID_PAGE_NUMBER)

  return state[pageNumber] ? state[pageNumber].map(id => byId[id]) : []
}
