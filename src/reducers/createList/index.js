import { combineReducers } from 'redux'
import * as types from '../../actions/types'
import { createIds } from './ids'
import { createById } from './byId'
import { createTotalPages } from './totalPages'
import { createErrorMessage } from './errorMessage'
import { createIsFetching } from './isFetching'
import { createByPageNumber } from './byPageNumber'

export default type => {
  const ids = createIds(type)
  const byId = createById(type)
  const totalPages = createTotalPages(type)
  const errorMessage = createErrorMessage(type)
  const isFetching = createIsFetching(type)
  const byPageNumber = createByPageNumber(type)

  return combineReducers({
    totalPages,
    byPageNumber,
    ids,
    byId,
    errorMessage,
    isFetching
  })
}

export const getErrorMessage = state => state.errorMessage

export const getData = (state, type, { slug, pageNumber = 1 } = {}) => {
  const data = state.ids.map(id => state.byId[id])

  switch (type) {
    case types.posts:
      return state.byPageNumber[pageNumber] || []
    case types.single:
      return data.filter(post => post.slug === slug)
    default:
      return data
  }
}

export const getIsFetching = state => state.isFetching

export const getTotalPages = state => state.totalPages
