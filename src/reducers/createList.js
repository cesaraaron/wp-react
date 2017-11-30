import { combineReducers } from 'redux'
import { types } from '../actions'
import { createOnFetchVars } from '../actions/types'

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

export const byPageNumber = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_POSTS_SUCCESS: {
      const { pageNumber = 1, response } = action
      return {
        ...state,
        [pageNumber]: response.result.map(id => response.entities.post[id])
      }
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

  // When the data is for single only return the post that matches the param /:slug of the route
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
