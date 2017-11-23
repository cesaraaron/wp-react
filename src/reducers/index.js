import { combineReducers } from 'redux'
import posts, * as fromPosts from './posts'
import single, * as fromSingle from './single'

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
  posts,
  single,
  endpoint
})

export const getEndpoint = state => state.endpoint

export const getPostsErrorMessage = state =>
  fromPosts.getPostsErrorMessage(state.posts)

export const getIsFetchingPosts = state =>
  fromPosts.getIsFetchingPosts(state.posts)

export const getPosts = state => fromPosts.getPosts(state.posts)

export const getSingleErrorMessage = state =>
  fromSingle.getSingleErrorMessage(state.single)

export const getIsFetchingSingle = state =>
  fromSingle.getIsFetchingSingle(state.single)

export const getSingle = (state, slug) =>
  fromSingle.getSingle(state.single, slug)
