import { combineReducers } from 'redux'
// import * as types from '../../actions/types'
import { createIds } from './ids'
import { createById } from './byId'
import { createTotalPages } from './totalPages'
import { createErrorMessage } from './errorMessage'
import { createIsFetching } from './isFetching'
import { createByPageNumber, getPostsByPage as getByPage } from './byPageNumber'
import * as fromIdsByPage from './idsByPage'

export default type => {
  return combineReducers({
    ids: createIds(type),
    idsByPage: fromIdsByPage.createIdsByPage(type),
    byId: createById(type),
    totalPages: createTotalPages(type),
    errorMessage: createErrorMessage(type),
    isFetching: createIsFetching(type),
    byPageNumber: createByPageNumber(type)
  })
}

export const getPosts = (state, byId) => state.ids.map(id => byId[id])

export const getPostsForPage = (state, pageNumber, byId) =>
  fromIdsByPage.getPostsForPage(state.idsByPage, pageNumber, byId)

export const getData = state => state.ids.map(id => state.byId[id])

export const getErrorMessage = state => state.errorMessage

export const getIsFetching = state => state.isFetching

export const getTotalPages = state => state.totalPages

export const getPostsByPage = (state, pageNumber) =>
  getByPage(state.byPageNumber, pageNumber)

export const getUserWithSlug = (state, slug) =>
  getData(state).filter(user => user.slug === slug)
