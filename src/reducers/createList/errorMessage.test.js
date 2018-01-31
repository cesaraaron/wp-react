import { createErrorMessage } from './errorMessage'
import * as types from '../../actions/types'

describe('createErrorMessage()', () => {
  const errorMessage = createErrorMessage(types.POSTS)

  it('should return null by default', () => {
    const actual = errorMessage(undefined, {})

    expect(actual).toBe(null)
  })

  it('should return a string when the action is an api fetch error', () => {
    const message = 'an error happened...'
    const actual = errorMessage(undefined, {
      type: types.FETCH_POSTS_FAILURE,
      message
    })

    expect(actual).toBe(message)
  })

  it('should return null when the action is an api fetch success', () => {
    const actual = errorMessage('', { type: types.FETCH_POSTS_SUCCESS })

    expect(actual).toBe(null)
  })
})
