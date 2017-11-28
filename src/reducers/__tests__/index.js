import rootReducer, {
  endpoint,
  getErrorMessage,
  getIsFetching,
  getData
} from '../index'
import { types } from '../../actions'

describe('properties of the rootReducer', () => {
  const root = rootReducer(undefined, {})
  const expected = {
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

describe('getData()', () => {
  it('returns and empty array of posts', () => {
    const state = { [types.posts]: { byId: {}, ids: [] } }

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

it('should get the errorMessage of posts', () => {
  const state = { [types.posts]: { errorMessage: '' } }

  const actual = getErrorMessage(state, types.posts)

  expect(actual).toBe('')
})
