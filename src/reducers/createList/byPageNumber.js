import invariant from 'invariant'
import { createOnFetchVars } from '../../actions/types'

const invalidPageNumber = pageNumber =>
  `Expect pageNumber to be a number > 0. Instead received: '${pageNumber}'`

export const createByPageNumber = type => (state = {}, action) => {
  const { pageNumber, response } = action
  const onFetch = createOnFetchVars(type)

  switch (action.type) {
    case onFetch.success:
      return Number(pageNumber) > 0
        ? {
            ...state,
            [pageNumber]: response.result.map(id => response.entities.post[id])
          }
        : state
    default:
      return state
  }
}

export const getPostsByPage = (state, pageNumber) => {
  invariant(Number(pageNumber) > 0, invalidPageNumber(pageNumber))

  return state[pageNumber] || []
}
