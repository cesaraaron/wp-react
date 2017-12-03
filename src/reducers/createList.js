import { combineReducers } from 'redux'
import * as types from '../actions/types'
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

export const createTotalPages = type => (state = 0, action) => {
  // const onFetch = createOnFetchVars(type)
  if (type !== types.posts) {
    return state
  }

  switch (action.type) {
    case types.FETCH_POSTS_SUCCESS: {
      const { _paging } = action.response
      if (
        !_paging ||
        Object.prototype.toString.call(_paging) !== '[object Object]'
      ) {
        throw new Error(
          `Expect the action.response to have a '_paging' object prop.`
        )
      }
      return Number(action.response._paging.totalPages)
    }
    default:
      return state
  }
}

export const byPageNumber = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_POSTS_SUCCESS: {
      const { pageNumber, response } = action

      if (typeof pageNumber !== 'number' || pageNumber <= 0) {
        throw new Error(
          `Expect pageNumber to be a number > 0. Instead received ${pageNumber}`
        )
      }

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
  const totalPages = createTotalPages(type)
  const errorMessage = createErrorMessage(type)
  const isFetching = createIsFetching(type)

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
