import { createByPageNumber, getPostsByPage } from '../byPageNumber'
import * as types from '../../../actions/types'
import { normalize } from 'normalizr'
import { arrayOfPosts } from '../../../actions/schema'
import { posts } from '../../../data/SampleData'

describe('byPageNumber()', () => {
  const byPageNumber = createByPageNumber(types.posts)
  it('should return an empty object', () => {
    const actual = byPageNumber(undefined, {})

    expect(actual).toEqual({})
  })

  it('should throw and error if pageNumber is falsey when the action is FETCH_POSTS_SUCCESS', () => {
    expect(() =>
      byPageNumber(undefined, { type: types.FETCH_POSTS_SUCCESS })
    ).toThrowError(/pageNumber/)
  })

  it('should return an object where the keys are from `action.pageNumber` and the values are a map of `response.result.map(id => ...) when the action.type is FETCH_POSTS_SUCCESS', () => {
    const response = normalize(posts, arrayOfPosts)
    const actual = byPageNumber(undefined, {
      type: types.FETCH_POSTS_SUCCESS,
      response,
      pageNumber: 1
    })

    const expected = {
      1: response.result.map(id => response.entities.post[id])
    }

    expect(actual).toEqual(expected)
  })
})

describe('getPostsByPageNumber()', () => {
  const state = {}
  it('should return an empty array', () => {
    const actual = getPostsByPage(state, 1)

    expect(actual).toEqual([])
  })

  it('should return an error if the pageNumber is falsey', () => {
    expect(() => getPostsByPage(state, undefined)).toThrowError(/pageNumber/)
  })
})
