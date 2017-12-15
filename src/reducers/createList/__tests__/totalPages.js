import { createTotalPages } from '../totalPages'
import * as types from '../../../actions/types'

describe('totalPages()', () => {
  const totalPages = createTotalPages(types.posts)

  it('should return 0 by default', () => {
    const actual = totalPages(undefined, {})

    expect(actual).toBe(0)
  })

  it('shoult return the number of pages from the response._paging prop when the action is ... POSTS_SUCCESS', () => {
    const response = { _paging: { totalPages: '4' } }
    const actual = totalPages(undefined, {
      type: types.FETCH_POSTS_SUCCESS,
      response
    })

    expect(actual).toBe(4)
  })
})
