import {
  createIds,
  createIsFetching,
  byPageNumber,
  createById,
  createErrorMessage
} from '../createList'
import * as types from '../../actions/types'
import { normalize } from 'normalizr'
import { posts } from '../../data/SampleData'
import { arrayOfPosts } from '../../actions/schema'

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

describe('createIsFetching()', () => {
  const isFetching = createIsFetching(types.posts)

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

describe('createById()', () => {
  const byId = createById(types.posts)

  it('should return an empty object by default', () => {
    const val = byId(undefined, {})

    expect(val).toEqual({})
  })

  it('should return an object of posts with the ids as keys', () => {
    posts
    const response = normalize(posts, arrayOfPosts)
    const actual = byId(undefined, {
      type: types.FETCH_POSTS_SUCCESS,
      response
    })
    const expected = response.entities.post

    expect(actual).toEqual(expected)
  })
})

describe('createErrorMessage()', () => {
  const errorMessage = createErrorMessage(types.posts)

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

describe('byPageNumber()', () => {
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
