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

export const FETCH_ALL_CATEGORIES_REQUEST = 'FETCH_ALL_CATEGORIES_REQUEST'

export const FETCH_ALL_CATEGORIES_SUCCESS = 'FETCH_ALL_CATEGORIES_SUCCESS'

export const FETCH_ALL_CATEGORIES_FAILURE = 'FETCH_ALL_CATEGORIES_FAILURE'

export const FETCH_POSTS_BY_SEARCH_QUERY_REQUEST =
  'FETCH_POSTS_BY_SEARCH_QUERY_REQUEST'

export const FETCH_POSTS_BY_SEARCH_QUERY_SUCCESS =
  'FETCH_POSTS_BY_SEARCH_QUERY_SUCCESS'

export const FETCH_POSTS_BY_SEARCH_QUERY_FAILURE =
  'FETCH_POSTS_BY_SEARCH_QUERY_FAILURE'

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'

export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

export const FETCH_POSTS_BY_AUTHOR_REQUEST = 'FETCH_POSTS_BY_AUTHOR_REQUEST'

export const FETCH_POSTS_BY_AUTHOR_SUCCESS = 'FETCH_POSTS_BY_AUTHOR_SUCCESS'

export const FETCH_POSTS_BY_AUTHOR_FAILURE = 'FETCH_POSTS_BY_AUTHOR_FAILURE'

export const posts = 'posts'

export const single = 'single'

export const comments = 'comments'

export const postsByCategory = 'postsByCategory'

export const allCategories = 'allCategories'

export const searchQuery = 'searchQuery'

export const users = 'users'

export const postsByAuthor = 'postsByAuthor'

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
    case allCategories:
      onFetch.request = FETCH_ALL_CATEGORIES_REQUEST
      onFetch.success = FETCH_ALL_CATEGORIES_SUCCESS
      onFetch.failure = FETCH_ALL_CATEGORIES_FAILURE
      break
    case searchQuery:
      onFetch.request = FETCH_POSTS_BY_SEARCH_QUERY_REQUEST
      onFetch.success = FETCH_POSTS_BY_SEARCH_QUERY_SUCCESS
      onFetch.failure = FETCH_POSTS_BY_SEARCH_QUERY_FAILURE
      break
    case users:
      onFetch.request = FETCH_USERS_REQUEST
      onFetch.success = FETCH_USERS_SUCCESS
      onFetch.failure = FETCH_USERS_FAILURE
      break
    case postsByAuthor:
      onFetch.request = FETCH_POSTS_BY_AUTHOR_REQUEST
      onFetch.success = FETCH_POSTS_BY_AUTHOR_SUCCESS
      onFetch.failure = FETCH_POSTS_BY_AUTHOR_FAILURE
      break
    default:
      throw new Error(`Invalid type: ${type}`)
  }
  return onFetch
}
