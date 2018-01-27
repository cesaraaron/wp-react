import rootReducer, {
  endpoint,
  postsById,
  commentsById,
  usersById,
  // getTotalPages,
  getPosts,
  getPostsForPage,
  // getPostsByPage,
  getErrorMessage,
  getIsFetching,
  getCommentsForPost,
  getSingleWithSlug,
  getUserWithSlug,
  getPostsForAuthorWithSlug
} from './index'
import { createStore } from 'redux'
import * as types from '../actions/types'
import { normalize } from 'normalizr'
import { arrayOfPosts } from '../actions/schema'
import { posts, comments, users } from '../utils/SampleData'

const postsResponse = normalize(posts, arrayOfPosts)
const commentsResponse = normalize(comments, arrayOfPosts)
const usersResponse = normalize(users, arrayOfPosts)

describe('endpoint()', () => {
  it('should return an empty string', () => {
    const val = endpoint(undefined, {})
    expect(val).toBe('')
  })

  it('should get the api endpoint', () => {
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

it('returns false when calling getIsFetching', () => {
  const { getState } = createStore(rootReducer)
  const val = getIsFetching(getState(), types.POSTS)

  expect(val).toBe(false)
})

describe('Selectors', () => {
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

  let { getState, dispatch } = createStore(rootReducer)

  beforeEach(() => {
    const store = createStore(rootReducer)
    getState = store.getState
    dispatch = store.dispatch
  })

  describe('getPosts()', () => {
    const actual = getPosts(getState(), types.POSTS)
    expect(actual).toEqual([])
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
      const actual = getPostsForPage(getState(), types.POSTS, pageNumber)

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
})

// it('should get the totalPages number from the rootReducer object', () => {
//   const state = { [types.posts]: { totalPages: 4 } }
//   const actual = getTotalPages(state, types.posts)

//   expect(actual).toBe(4)
// })
