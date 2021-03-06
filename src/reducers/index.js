import { combineReducers } from 'redux'
import createList, * as fromCreateList from './createList'
import * as types from '../actions/types'

export const endpoint = (state = '', action) => {
  switch (action.type) {
    case 'GET_ENDPOINT':
      return action.homepage
        ? action.homepage + '/wp-json'
        : action.location.origin + '/wp-json'
    default:
      return state
  }
}
export const createById = type => (state = {}, action) => {
  switch (action.type) {
    case type:
      return {
        ...state,
        ...action.response.entities.post
      }
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
    case types.FETCH_POSTS_BY_AUTHOR_SUCCESS:
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

export const usersById = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        ...action.response.entities.post
      }
    default:
      return state
  }
}

export const categoriesById = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        ...action.response.entities.post
      }
    default:
      return state
  }
}

export const pagesById = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_PAGE_SUCCESS:
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
  usersById,
  postsById,
  commentsById,
  categoriesById,
  pagesById,
  [types.USERS]: createList(types.USERS),
  [types.POSTS]: createList(types.POSTS),
  [types.SINGLE]: createList(types.SINGLE),
  [types.COMMENTS]: createList(types.COMMENTS),
  [types.POSTS_BY_CATEGORY]: createList(types.POSTS_BY_CATEGORY),
  [types.ALL_CATEGORIES]: createList(types.ALL_CATEGORIES),
  [types.SEARCH_QUERY]: createList(types.SEARCH_QUERY),
  [types.POSTS_BY_AUTHOR]: createList(types.POSTS_BY_AUTHOR),
  [types.PAGE]: createList(types.PAGE)
})

const getData = byId => Object.keys(byId).map(id => byId[id])

export const getTotalPages = ({ state, type, ...rest }) =>
  fromCreateList.getTotalPages({ state: state[type], ...rest })

export const getEndpoint = state => state.endpoint

export const getPosts = (state, type) =>
  state[type].ids.map(id => state.postsById[id])

export const getPostsForPage = ({ state, type, pageNumber }) =>
  fromCreateList.getPostsForPage({
    state: state[type],
    pageNumber,
    byId: state.postsById
  })

export const getCommentsForPost = (state, postId) =>
  getData(state.commentsById).filter(comment => comment.post === postId)

export const getSingleWithSlug = ({ postsById }, slug) =>
  getData(postsById).filter(post => post.slug === slug)

export const getUserWithSlug = (state, slug) =>
  getData(state.usersById).filter(user => user.slug === slug)

export const getPostsForAuthorWithSlug = (state, slug) =>
  getData(state.postsById).filter(post => {
    const [user] = getUserWithSlug(state, slug)
    return user && user.id === post.author
  })

export const getPageWithSlug = ({ state, slug }) =>
  getData(state.pagesById).filter(page => page.slug === slug)

export const getAllCategories = ({ categoriesById }) => getData(categoriesById)

export const getIsFetching = (state, type) =>
  fromCreateList.getIsFetching(state[type], type)

export const getErrorMessage = (state, type) =>
  fromCreateList.getErrorMessage(state[type])
