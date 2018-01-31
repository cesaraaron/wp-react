import { createIsFetching } from './isFetching'
import * as types from '../../actions/types'

describe('createIsFetching()', () => {
  const isFetching = createIsFetching(types.POSTS)

  it('should return false by default', () => {
    const actual = isFetching(undefined, {})

    expect(actual).toBe(false)
  })

  it('should return true when the action is an api request', () => {
    const actual = isFetching(undefined, { type: types.FETCH_POSTS_REQUEST })

    expect(actual).toBe(true)
  })

  it('should return false when the action is either a request success or failure', () => {
    let actual = isFetching(true, { type: types.FETCH_POSTS_SUCCESS })
    expect(actual).toBe(false)

    actual = isFetching(true, { type: types.FETCH_POSTS_FAILURE })
    expect(actual).toBe(false)
  })
})
