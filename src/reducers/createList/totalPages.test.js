import { createTotalPages, getTotalPages } from './totalPages'
import * as types from '../../actions/types'

describe('totalPages()', () => {
  const totalPages = createTotalPages(types.POSTS)

  it('should return { default: { totalPages: 0 } } by default', () => {
    const actual = totalPages(undefined, {})
    const expected = { _default: 0 }

    expect(actual).toEqual(expected)
  })

  it('should return { _default: numberOfPages } when there is no authorId in the action', () => {
    const actual = totalPages(undefined, {
      type: types.FETCH_POSTS_SUCCESS,
      _paging: { totalPages: '4' }
    })
    const expected = { _default: 4 }

    expect(actual).toEqual(expected)
  })

  it('should return { [authorId]: numberOfPages when pass the authorId in the action', () => {
    const actual = totalPages(undefined, {
      type: types.FETCH_POSTS_SUCCESS,
      _paging: { totalPages: '2' },
      authorId: 2
    })
    const expected = { [2]: 2 }

    expect(actual).toEqual(expected)
  })
})

describe('getTotalPages()', () => {
  it('should return the totalPages if there is a passed authorId in the params', () => {
    const authorId = 5
    const totalPages = 4
    const state = { [authorId]: totalPages }
    const actual = getTotalPages({ state, authorId })

    expect(actual).toBe(totalPages)
  })

  it('should return the totalPages from state', () => {
    const state = { _default: 5 }
    const actual = getTotalPages({ state })

    expect(actual).toBe(5)
  })
})
