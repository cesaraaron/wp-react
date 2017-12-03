import { createIds } from '../ids'
import * as types from '../../../actions/types'
import { normalize } from 'normalizr'
import { arrayOfPosts } from '../../../actions/schema'
import { posts } from '../../../data/SampleData'

describe('createIds()', () => {
  const ids = createIds(types.posts)

  it('should return and empty array by default', () => {
    const actual = ids(undefined, {})

    expect(actual).toEqual([])
  })

  it('should return an array of ids', () => {
    const response = { result: [1, 2, 3] }
    const actual = ids(undefined, { type: types.FETCH_POSTS_SUCCESS, response })
    const expected = response.result

    expect(actual).toEqual(expected)
  })

  // ids = createIds('single')
  it("should merge the response's ids with the state when the action is FETCH_SINGLE_SUCCESS", () => {
    const ids = createIds(types.single)
    const response = { result: [1, 4, 5] }
    const actual = ids([1, 2, 3], {
      type: types.FETCH_SINGLE_SUCCESS,
      response
    })
    const expected = [1, 2, 3, 4, 5]

    expect(actual).toEqual(expected)
  })
})
