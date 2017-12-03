import { createById } from '../byId'
import * as types from '../../../actions/types'
import { normalize } from 'normalizr'
import { arrayOfPosts } from '../../../actions/schema'
import { posts } from '../../../data/SampleData'

describe('createById()', () => {
  const byId = createById(types.posts)

  it('should return an empty object by default', () => {
    const val = byId(undefined, {})

    expect(val).toEqual({})
  })

  it('should return an object of posts with the ids as keys', () => {
    const response = normalize(posts, arrayOfPosts)
    const actual = byId(undefined, {
      type: types.FETCH_POSTS_SUCCESS,
      response
    })
    const expected = response.entities.post

    expect(actual).toEqual(expected)
  })
})
