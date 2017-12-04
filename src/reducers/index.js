import { combineReducers } from 'redux'
import createList, * as fromCreateList from './createList'
import * as types from '../actions/types'

export const endpoint = (state = '', action) => {
  switch (action.type) {
    case 'GET_ENDPOINT':
      // It should get the api endpoint from a link in the document head with
      // a rel attribute set to ’https://api.w.org/’
      return `${action.location.origin}/wp-json`
    default:
      return state
  }
}

export default combineReducers({
  [types.posts]: createList(types.posts),
  [types.single]: createList(types.single),
  [types.comments]: createList(types.comments),
  [types.postsByCategory]: createList(types.postsByCategory),
  endpoint
})

export const getTotalPages = (state, type) =>
  fromCreateList.getTotalPages(state[type])

export const getEndpoint = state => state.endpoint

export const getData = (state, type, options) =>
  fromCreateList.getData(state[type], type, options)

export const getIsFetching = (state, type) =>
  fromCreateList.getIsFetching(state[type], type)

export const getErrorMessage = (state, type) =>
  fromCreateList.getErrorMessage(state[type])

export const getPostsByPage = (state, type, pageNumber) =>
  fromCreateList.getPostsByPage(state[type], pageNumber)
