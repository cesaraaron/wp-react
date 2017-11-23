// copy & paste from posts, not testing due to near future refactoring 🤔

import { combineReducers } from 'redux'

export const ids = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SINGLE_SUCCESS':
      return [...action.response.result]
    default:
      return state
  }
}

export const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_SINGLE_SUCCESS':
      return {
        ...state,
        ...action.response.entities.post
      }
    default:
      return state
  }
}

export const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_SINGLE':
      return true
    case 'FETCH_SINGLE_SUCCESS':
    case 'FETCH_SINGLE_FAILURE':
      return false
    default:
      return state
  }
}

export const errorMessage = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_SINGLE_FAILURE':
      return action.message
    case 'FETCH_SINGLE':
    case 'FETCH_SINGLE_SUCCESS':
      return null
    default:
      return state
  }
}

export default combineReducers({
  ids,
  byId,
  errorMessage,
  isFetching
})

export const getSingleErrorMessage = state => state.errorMessage

export const getIsFetchingSingle = state => state.isFetching

export const getSingle = (state, slug) => {
  const posts = state.ids.map(id => state.byId[id])
  return posts.filter(single => single.slug === slug)
}
