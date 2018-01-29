import { combineReducers } from 'redux'
// import * as types from '../../actions/types'
import { createIds } from './ids'
import { createTotalPages } from './totalPages'
import { createErrorMessage } from './errorMessage'
import { createIsFetching } from './isFetching'
import * as fromIdsByPage from './idsByPage'

export default type => {
  return combineReducers({
    ids: createIds(type),
    idsByPage: fromIdsByPage.createIdsByPage(type),
    totalPages: createTotalPages(type),
    errorMessage: createErrorMessage(type),
    isFetching: createIsFetching(type)
  })
}

export const getPosts = (state, byId) => state.ids.map(id => byId[id])

export const getPostsForPage = (state, pageNumber, byId) =>
  fromIdsByPage.getPostsForPage(state.idsByPage, pageNumber, byId)

export const getErrorMessage = state => state.errorMessage

export const getIsFetching = state => state.isFetching

export const getTotalPages = state => state.totalPages
