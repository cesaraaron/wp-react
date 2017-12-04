import { combineReducers } from 'redux'
import * as types from '../../actions/types'
import { createIds } from './ids'
import { createById } from './byId'
import { createTotalPages } from './totalPages'
import { createErrorMessage } from './errorMessage'
import { createIsFetching } from './isFetching'
import { createByPageNumber, getPostsByPage as getByPage } from './byPageNumber'

export default type => {
  return combineReducers({
    ids: createIds(type),
    byId: createById(type),
    totalPages: createTotalPages(type),
    errorMessage: createErrorMessage(type),
    isFetching: createIsFetching(type),
    byPageNumber: createByPageNumber(type)
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

export const getPostsByPage = (state, pageNumber) =>
  getByPage(state.byPageNumber, pageNumber)
