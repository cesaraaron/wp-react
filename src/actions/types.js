export const GET_ENDPOINT = 'GET_ENDPOINT'

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'

export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'

export const FETCH_SINGLE_REQUEST = 'FETCH_SINGLE_REQUEST'

export const FETCH_SINGLE_SUCCESS = 'FETCH_SINGLE_SUCCESS'

export const FETCH_SINGLE_FAILURE = 'FETCH_SINGLE_FAILURE'

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST'

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS'

export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE'

export const FETCH_POSTS_BY_CATEGORY_REQUEST = 'FETCH_POSTS_BY_CATEGORY_REQUEST'

export const FETCH_POSTS_BY_CATEGORY_SUCCESS = 'FETCH_POSTS_BY_CATEGORY_SUCCESS'

export const FETCH_POSTS_BY_CATEGORY_FAILURE = 'FETCH_POSTS_BY_CATEGORY_FAILURE'

export const posts = 'posts'

export const single = 'single'

export const comments = 'comments'

export const postsByCategory = 'postsByCategory'

export const createOnFetchVars = type => {
  const onFetch = {}
  switch (type) {
    case posts:
      onFetch.request = FETCH_POSTS_REQUEST
      onFetch.success = FETCH_POSTS_SUCCESS
      onFetch.failure = FETCH_POSTS_FAILURE
      break
    case single:
      onFetch.request = FETCH_SINGLE_REQUEST
      onFetch.success = FETCH_SINGLE_SUCCESS
      onFetch.failure = FETCH_SINGLE_FAILURE
      break
    case comments:
      onFetch.request = FETCH_COMMENTS_REQUEST
      onFetch.success = FETCH_COMMENTS_SUCCESS
      onFetch.failure = FETCH_COMMENTS_FAILURE
      break
    case postsByCategory:
      onFetch.request = FETCH_POSTS_BY_CATEGORY_REQUEST
      onFetch.success = FETCH_POSTS_BY_CATEGORY_SUCCESS
      onFetch.failure = FETCH_POSTS_BY_CATEGORY_FAILURE
      break
    default:
      throw new Error(`Invalid type: ${type}`)
  }
  return onFetch
}
