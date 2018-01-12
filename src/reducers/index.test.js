import rootReducer, {
  endpoint,
  postsById,
  commentsById,
  // getTotalPages,
  getPosts,
  getPostsForPage,
  getPostsByPage,
  getErrorMessage,
  getIsFetching,
  getCommentsForPost,
  getSingleWithSlug
} from './index'
import * as types from '../actions/types'
import { normalize } from 'normalizr'
import { arrayOfPosts } from '../actions/schema'
import { posts, comments } from '../utils/SampleData'

describe('createList() properties', () => {
  const root = rootReducer(undefined, {})
  const expected = {
    idsByPage: {},
    byPageNumber: {},
    totalPages: 0,
    byId: {},
    errorMessage: null,
    ids: [],
    isFetching: false
  }

  it('has a posts object', () => {
    expect(root[types.posts]).toEqual(expected)
  })

  it('has the single object', () => {
    expect(root[types.single]).toEqual(expected)
  })

  it('has the comments object', () => {
    expect(root[types.comments]).toEqual(expected)
  })

  it('has the postsByCategory object', () => {
    expect(root[types.postsByCategory]).toEqual(expected)
  })
})

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
    const response = normalize(posts, arrayOfPosts)
    const actual = postsById(undefined, {
      type: types.FETCH_POSTS_SUCCESS,
      response
    })

    expect(actual).toEqual(response.entities.post)
  })
})

describe('commentsById()', () => {
  it('should return an empty object by default', () => {
    const actual = commentsById(undefined, {})

    expect(actual).toEqual({})
  })

  it('should return an object with comments', () => {
    const response = normalize(comments, arrayOfPosts)
    const actual = commentsById(undefined, {
      type: types.FETCH_COMMENTS_SUCCESS,
      response
    })

    expect(actual).toEqual(response.entities.post)
  })
})

it('returns false when calling getIsFetching', () => {
  const state = { [types.posts]: { isFetching: false } }
  const val = getIsFetching(state, types.posts)

  expect(val).toBe(false)
})

describe('Selectors', () => {
  describe('getPosts()', () => {
    const state = {
      [types.posts]: { ids: [] }
    }

    const actual = getPosts(state, types.posts)
    expect(actual).toEqual([])
  })

  describe('getComments()', () => {
    it('returns and empty array of comments', () => {
      const postId = 1
      const state = {
        [types.comments]: { byId: {}, ids: [], byPageNumber: {} }
      }

      const actual = getCommentsForPost(state, postId)

      expect(actual).toEqual([])
    })

    it('returns an array with one comment', () => {
      const comment = {
        id: 1,
        post: 10
      }
      const state = {
        commentsById: {
          1: comment
        },
        [types.comments]: {
          ids: [1]
        }
      }
      const actual = getCommentsForPost(state, comment.post)

      expect(actual).toEqual([comment])
    })
  })

  it('should get the errorMessage of [types.posts]', () => {
    const state = { [types.posts]: { errorMessage: '' } }

    const actual = getErrorMessage(state, types.posts)

    expect(actual).toBe('')
  })

  describe('getPostsForPage()', () => {
    it('should return an array with one post', () => {
      const page = 1
      const postId = 1
      const postsById = { [postId]: { title: 'post title' } }
      const state = {
        postsById,
        [types.posts]: { idsByPage: { [page]: [postId] } }
      }

      const actual = getPostsForPage(state, types.posts, page)
      expect(actual).toEqual([postsById[postId]])
    })
  })

  describe('getPostsByPage()', () => {
    const posts = [{ 1: { id: 1 } }]
    const state = { [types.posts]: { byPageNumber: { 1: posts } } }

    it('should return an array of posts', () => {
      const actual = getPostsByPage(state, types.posts, 1)

      expect(actual).toEqual(posts)
    })
  })

  describe('getSingleWithSlug()', () => {
    const postsById = {
      1: { slug: 'hello-world' },
      2: { slug: 'hello-world2' }
    }
    const state = { postsById }

    it('should return an array with one post', () => {
      const actual = getSingleWithSlug(state, 'hello-world')

      expect(actual).toEqual([{ slug: 'hello-world' }])
    })
  })
})

// it('should get the totalPages number from the rootReducer object', () => {
//   const state = { [types.posts]: { totalPages: 4 } }
//   const actual = getTotalPages(state, types.posts)

//   expect(actual).toBe(4)
// })
