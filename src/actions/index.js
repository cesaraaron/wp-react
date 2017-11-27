import * as types from './types'

export { types }

export const getEndpoint = location => ({
  type: types.GET_ENDPOINT,
  location
})

export const fetchPosts = () => ({
  type: types.FETCH_POSTS_REQUEST
})

export const fetchSingle = slug => ({
  type: types.FETCH_SINGLE_REQUEST,
  slug
})
