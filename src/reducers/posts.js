import { combineReducers } from 'redux'

export const ids = (state = [], action) => {
  switch (action.type) {
    default:
      return state
  }
}

export const byId = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export const isFetching = (state = false, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  ids,
  byId,
  isFetching
})

export const getIsFetchingPosts = state => state.isFetching

export const getPosts = state => state.ids.map(id => state.byId[id])
