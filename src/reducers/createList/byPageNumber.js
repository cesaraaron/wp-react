import invariant from 'invariant'
import { createOnFetchVars } from '../../actions/types'

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
  invariant(
    Number(pageNumber) > 0,
    `Invalid pageNumber passed to getPostsByPage() selector. Expected a number > 0 but got: '${pageNumber}'`
  )

  return state[pageNumber] || []
}
