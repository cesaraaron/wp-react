import * as types from './types'

export { types }

export const getEndpoint = location => ({
  type: types.GET_ENDPOINT,
  location
})

export const fetchPosts = (pageNumber = 1) => ({
  type: types.FETCH_POSTS_REQUEST,
  pageNumber
})

export const fetchSingle = slug => ({
  type: types.FETCH_SINGLE_REQUEST,
  slug
})

export const fetchComments = postId => ({
  type: types.FETCH_COMMENTS_REQUEST,
  postId
})
