import isObject from 'lodash/isObject'
import { createOnFetchVars } from '../../actions/types'

export const createTotalPages = type => (state = 0, action) => {
  const onFetch = createOnFetchVars(type)

  switch (action.type) {
    case onFetch.success:
      return isObject(action.response._paging)
        ? Number(action.response._paging.totalPages)
        : state
    default:
      return state
  }
}
