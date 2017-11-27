import { combineReducers } from 'redux'
import { types } from '../actions'

export const createOnFetchVars = type => {
  const onFetch = {}
  switch (type) {
    case types.posts:
      onFetch.request = types.FETCH_POSTS_REQUEST
      onFetch.success = types.FETCH_POSTS_SUCCESS
      onFetch.failure = types.FETCH_POSTS_FAILURE
      break
    case types.single:
      onFetch.request = types.FETCH_SINGLE_REQUEST
      onFetch.success = types.FETCH_SINGLE_SUCCESS
      onFetch.failure = types.FETCH_SINGLE_FAILURE
      break
    default:
      throw new Error(`Invalid type: ${type}`)
  }
  return onFetch
}

export const createIds = type => (state = [], action) => {
  const onFetch = createOnFetchVars(type)

  switch (action.type) {
    case onFetch.success: {
      const { result } = action.response

      return type === types.posts
        ? [...action.response.result]
        : [...state, ...result.filter(id => state.indexOf(id) < 0)]
    }
    default:
      return state
  }
}

export const createIsFetching = type => (state = false, action) => {
  const onFetch = createOnFetchVars(type)
  switch (action.type) {
    case onFetch.request:
      return true
    case onFetch.success:
    case onFetch.failure:
      return false
    default:
      return state
  }
}

export const createById = type => (state = {}, action) => {
  const onFetch = createOnFetchVars(type)
  switch (action.type) {
    case onFetch.success:
      return {
        ...state,
        ...action.response.entities.post
      }
    default:
      return state
  }
}

export const createErrorMessage = type => (state = null, action) => {
  const onFetch = createOnFetchVars(type)

  switch (action.type) {
    case onFetch.failure:
      return action.message
    case onFetch.success:
      return null
    default:
      return state
  }
}

export default type => {
  const ids = createIds(type)
  const byId = createById(type)
  const errorMessage = createErrorMessage(type)
  const isFetching = createIsFetching(type)

  return combineReducers({
    ids,
    byId,
    errorMessage,
    isFetching
  })
}

export const getErrorMessage = state => state.errorMessage

export const getData = (state, type, { slug } = {}) => {
  const posts = state.ids.map(id => state.byId[id])

  // When the data is for single only return the post that matches the param /:slug of the route
  return type === types.single
    ? posts.filter(post => post.slug === slug)
    : posts
}

export const getIsFetching = state => state.isFetching
