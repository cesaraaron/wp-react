import { combineReducers } from 'redux'
// import * as types from '../../actions/types'
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

export const getData = state => state.ids.map(id => state.byId[id])

export const getErrorMessage = state => state.errorMessage

export const getSingleWithSlug = (state, slug) =>
  getData(state).filter(post => post.slug === slug)

export const getIsFetching = state => state.isFetching

export const getTotalPages = state => state.totalPages

export const getPostsByPage = (state, pageNumber) =>
  getByPage(state.byPageNumber, pageNumber)
