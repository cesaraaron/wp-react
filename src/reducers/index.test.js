import rootReducer, {
  endpoint,
  // getTotalPages,
  getPostsByPage,
  getErrorMessage,
  getIsFetching,
  getData
} from './index'
import * as types from '../actions/types'

describe('createList() properties', () => {
  const root = rootReducer(undefined, {})
  const expected = {
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

it('returns false when calling getIsFetching', () => {
  const state = { [types.posts]: { isFetching: false } }
  const val = getIsFetching(state, types.posts)

  expect(val).toBe(false)
})

describe('Selectors', () => {
  describe('getData()', () => {
    it('returns and empty array of posts', () => {
      const state = { [types.posts]: { byId: {}, ids: [], byPageNumber: {} } }

      const val = getData(state, types.posts)

      expect(val).toEqual([])
    })

    it('when getting the state of [types.single] should return an array when only one item matching the `slug` of the route', () => {
      const byId = { 1: { slug: 'hello-world' }, 2: { slug: 'sample-post' } }
      const ids = [1, 2]
      const state = { [types.single]: { byId, ids } }

      const actual = getData(state, types.single, { slug: 'hello-world' })

      expect(actual).toEqual([{ slug: 'hello-world' }])
    })
  })

  it('should get the errorMessage of [types.posts]', () => {
    const state = { [types.posts]: { errorMessage: '' } }

    const actual = getErrorMessage(state, types.posts)

    expect(actual).toBe('')
  })

  describe('getPostsByPage()', () => {
    const posts = [{ 1: { id: 1 } }]
    const state = { [types.posts]: { byPageNumber: { 1: posts } } }

    it('should return an array of posts', () => {
      const actual = getPostsByPage(state, types.posts, 1)

      expect(actual).toEqual(posts)
    })
  })
})

// it('should get the totalPages number from the rootReducer object', () => {
//   const state = { [types.posts]: { totalPages: 4 } }
//   const actual = getTotalPages(state, types.posts)

//   expect(actual).toBe(4)
// })
