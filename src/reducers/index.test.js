import rootReducer, {
  endpoint,
  postsById,
  commentsById,
  usersById,
  categoriesById,
  pagesById,
  // getTotalPages,
  getPosts,
  getPostsForPage,
  // getPostsByPage,
  getErrorMessage,
  getIsFetching,
  getCommentsForPost,
  getSingleWithSlug,
  getUserWithSlug,
  getPostsForAuthorWithSlug,
  getAllCategories,
  createById,
  getPageWithSlug
} from './index'
import { createStore } from 'redux'
import * as types from '../actions/types'
import { normalize } from 'normalizr'
import { arrayOfPosts } from '../actions/schema'
import { posts, comments, users, categories, pages } from '../utils/SampleData'

const postsResponse = normalize(posts, arrayOfPosts)
const commentsResponse = normalize(comments, arrayOfPosts)
const usersResponse = normalize(users, arrayOfPosts)
const categoriesResponse = normalize(categories, arrayOfPosts)
const pagesResponse = normalize(pages, arrayOfPosts)

const getData = response =>
  response.result.map(id => response.entities.post[id])

const dispatchPosts = (dispatch, pageNumber = 1) =>
  dispatch({
    type: types.FETCH_POSTS_SUCCESS,
    response: postsResponse,
    pageNumber
  })
const dispatchComments = dispatch =>
  dispatch({ type: types.FETCH_COMMENTS_SUCCESS, response: commentsResponse })
const dispatchUsers = dispatch =>
  dispatch({ type: types.FETCH_USERS_SUCCESS, response: usersResponse })

const dispatchPages = dispatch =>
  dispatch({ type: types.FETCH_PAGE_SUCCESS, response: pagesResponse })

describe('endpoint()', () => {
  it('should return an empty string', () => {
    const val = endpoint(undefined, {})
    expect(val).toBe('')
  })

  it('should get the api url from homepage', () => {
    const actual = endpoint(undefined, {
      type: 'GET_ENDPOINT',
      homepage: 'localhost',
      location: {}
    })
    const expected = 'localhost/wp-json'

    expect(actual).toBe(expected)
  })

  it('should try to get the api url from origin if homepage is falsey', () => {
    const location = { origin: 'http://localhost' }
    const val = endpoint(undefined, { type: 'GET_ENDPOINT', location })
    expect(val).toBe(location.origin + '/wp-json')
  })
})

describe('postsById()', () => {
  it('should return an empty object by default', () => {
    const val = postsById(undefined, {})

    expect(val).toEqual({})
  })

  it('should return an object of posts with the ids as keys', () => {
    const actual = postsById(undefined, {
      type: types.FETCH_POSTS_SUCCESS,
      response: postsResponse
    })

    expect(actual).toEqual(postsResponse.entities.post)
  })
})

describe('commentsById()', () => {
  it('should return an empty object by default', () => {
    const actual = commentsById(undefined, {})

    expect(actual).toEqual({})
  })

  it('should return an object with comments', () => {
    const actual = commentsById(undefined, {
      type: types.FETCH_COMMENTS_SUCCESS,
      response: commentsResponse
    })

    expect(actual).toEqual(commentsResponse.entities.post)
  })
})

describe('usersById()', () => {
  it('should return an empty object by default', () => {
    const actual = usersById(undefined, {})

    expect(actual).toEqual({})
  })

  it('should return an object with users', () => {
    const actual = usersById(undefined, {
      type: types.FETCH_USERS_SUCCESS,
      response: usersResponse
    })

    expect(actual).toEqual(usersResponse.entities.post)
  })
})

describe('categoriesById()', () => {
  it('should return an empty object by default', () => {
    const actual = categoriesById(undefined, {})

    expect(actual).toEqual({})
  })

  it('should return an object with categories', () => {
    const actual = categoriesById(undefined, {
      type: types.FETCH_ALL_CATEGORIES_SUCCESS,
      response: categoriesResponse
    })

    expect(actual).toEqual(categoriesResponse.entities.post)
  })
})

describe('pagesById()', () => {
  it('should return an empty object by default', () => {
    const actual = pagesById(undefined, {})

    expect(actual).toEqual({})
  })
})

it('returns false when calling getIsFetching', () => {
  const { getState } = createStore(rootReducer)
  const val = getIsFetching(getState(), types.POSTS)

  expect(val).toBe(false)
})

describe('Selectors', () => {
  let { getState, dispatch } = createStore(rootReducer)

  beforeEach(() => {
    const store = createStore(rootReducer)
    getState = store.getState
    dispatch = store.dispatch
  })

  describe('getPosts()', () => {
    it('should return an empty array', () => {
      const actual = getPosts(getState(), types.POSTS)
      expect(actual).toEqual([])
    })

    it('should return all posts for types.POSTS state', () => {
      dispatchPosts(dispatch)
      const actual = getPosts(getState(), types.POSTS)

      expect(actual).toEqual(posts)
    })
  })

  describe('getComments()', () => {
    it('returns and empty array of comments', () => {
      const actual = getCommentsForPost(getState(), 0)

      expect(actual).toEqual([])
    })

    it('returns two comments for the post with id of `1`', () => {
      dispatchComments(dispatch)
      const actual = getCommentsForPost(getState(), 1)

      // the two comments in SampleData.comments have the post property set to `1`
      const expected = getData(commentsResponse)
      expect(actual).toEqual(expected)
    })
  })

  describe('getErrorMessage()', () => {
    it('should return null by default', () => {
      const actual = getErrorMessage(getState(), types.POSTS)

      expect(actual).toBe(null)
    })
  })

  describe('getPostsForPage()', () => {
    it('should return an array of posts for pageNumber=`1`', () => {
      const pageNumber = 1
      dispatchPosts(dispatch, pageNumber)
      const actual = getPostsForPage({
        state: getState(),
        pageNumber,
        type: types.POSTS
      })

      const expected = getData(postsResponse)
      expect(actual).toEqual(expected)
    })
  })

  describe('getSingleWithSlug()', () => {
    it('should return an array with one post', () => {
      dispatchPosts(dispatch)
      const single = posts[0]
      const actual = getSingleWithSlug(getState(), single.slug)

      expect(actual).toEqual([single])
    })
  })

  describe('getUserWithSlug()', () => {
    it('should return an array with one post', () => {
      dispatchUsers(dispatch)
      const singleUser = users[0]
      const actual = getUserWithSlug(getState(), singleUser.slug)

      expect(actual).toEqual([singleUser])
    })
  })

  describe('getPostsForAuthor()', () => {
    it('should return an array with posts for the first user in SampleData.js', () => {
      dispatchPosts(dispatch)
      dispatchUsers(dispatch)
      const actual = getPostsForAuthorWithSlug(getState(), users[0].slug)
      const expected = posts.filter(p => p.author === users[0].id)

      expect(actual).toEqual(expected)
    })
  })

  describe('getAllCategories()', () => {
    it('should return an array with all categories', () => {
      dispatch({
        type: types.FETCH_ALL_CATEGORIES_SUCCESS,
        response: categoriesResponse
      })

      const actual = getAllCategories(getState())

      expect(actual).toEqual(categories)
    })
  })

  describe('getPageWithSlug()', () => {
    it('should return an array with one page', () => {
      dispatchPages(dispatch)
      const page = pages[0]
      const actual = getPageWithSlug({ state: getState(), slug: page.slug })

      expect(actual).toEqual([page])
    })
  })
})

describe('createById', () => {
  it('should return a function', () => {
    const byId = createById(types.FETCH_POSTS_SUCCESS)

    expect(typeof byId).toBe('function')
  })
})
// it('should get the totalPages number from the rootReducer object', () => {
//   const state = { [types.posts]: { totalPages: 4 } }
//   const actual = getTotalPages(state, types.posts)

//   expect(actual).toBe(4)
// })
