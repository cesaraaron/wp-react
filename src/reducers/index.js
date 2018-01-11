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

export const postsById = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_POSTS_SUCCESS:
    case types.FETCH_SINGLE_SUCCESS:
    case types.FETCH_POSTS_BY_SEARCH_QUERY_SUCCESS:
    case types.FETCH_POSTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        ...action.response.entities.post
      }
    default:
      return state
  }
}

export const commentsById = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        ...action.response.entities.post
      }
    default:
      return state
  }
}

export default combineReducers({
  endpoint,
  postsById,
  [types.posts]: createList(types.posts),
  [types.single]: createList(types.single),
  [types.comments]: createList(types.comments),
  [types.postsByCategory]: createList(types.postsByCategory),
  [types.allCategories]: createList(types.allCategories),
  [types.searchQuery]: createList(types.searchQuery)
})

export const getTotalPages = (state, type) =>
  fromCreateList.getTotalPages(state[type])

export const getEndpoint = state => state.endpoint

export const getPosts = (state, type) =>
  fromCreateList.getPosts(state[type], state.postsById)

export const getPostsForPage = (state, type, pageNumber) =>
  fromCreateList.getPostsForPage(state[type], pageNumber, state.postsById)

export const getData = (state, type) => fromCreateList.getData(state[type])

export const getSingleWithSlug = (state, slug) =>
  fromCreateList.getSingleWithSlug(state[types.single], slug)

export const getIsFetching = (state, type) =>
  fromCreateList.getIsFetching(state[type], type)

export const getErrorMessage = (state, type) =>
  fromCreateList.getErrorMessage(state[type])

export const getPostsByPage = (state, type, pageNumber) =>
  fromCreateList.getPostsByPage(state[type], pageNumber)
