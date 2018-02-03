import { createOnFetchVars } from '../../actions/types'

export const createTotalPages = type => (state = { _default: 0 }, action) => {
  const onFetch = createOnFetchVars(type)
  const { authorId, _paging = {} } = action

  switch (action.type) {
    case onFetch.success: {
      return Number.isFinite(authorId)
        ? { [authorId]: Number(_paging.totalPages) }
        : _paging.totalPages ? { _default: Number(_paging.totalPages) } : state
    }
    default:
      return state
  }
}

export const getTotalPages = ({ state, authorId }) => {
  return state[authorId] ? state[authorId] : state._default
}
