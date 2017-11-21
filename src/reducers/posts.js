import { combineReducers } from 'redux'

export const ids = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS_SUCCESS':
      return [...action.response.result]
    default:
      return state
  }
}

export const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_POSTS_SUCCESS':
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
    case 'FETCH_POSTS':
      return true
    case 'FETCH_POSTS_SUCCESS':
    case 'FETCH_POSTS_FAILURE':
      return false
    default:
      return state
  }
}

export const errorMessage = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_POSTS_FAILURE':
      return action.message
    case 'FETCH_POSTS_SUCCESS':
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

export const getPostsErrorMessage = state => state.errorMessage

export const getIsFetchingPosts = state => state.isFetching

export const getPosts = state => state.ids.map(id => state.byId[id])
