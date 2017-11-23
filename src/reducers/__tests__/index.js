import rootReducer, {
  endpoint,
  getIsFetchingPosts,
  getPosts,
  getPostsErrorMessage
} from '../index'

it('has a posts object', () => {
  const val = rootReducer(undefined, {})

  expect(val).toMatchObject({ endpoint: '', posts: {} })
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

it('returns false when calling getIsFetchingPosts', () => {
  const state = { posts: { isFetching: false } }
  const val = getIsFetchingPosts(state)

  expect(val).toBe(false)
})

it('returns and empty array of posts', () => {
  const state = { posts: { byId: {}, ids: [] } }

  const val = getPosts(state)

  expect(val).toEqual([])
})

it('should get the errorMessage of posts', () => {
  const state = { posts: { errorMessage: '' } }

  const actual = getPostsErrorMessage(state)

  expect(actual).toBe('')
})
