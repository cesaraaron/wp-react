import { ids, byId, isFetching, errorMessage } from '../posts'
import { normalize } from 'normalizr'
import { posts } from '../../data/SampleData'
import { arrayOfPosts } from '../../sagas/schema'

describe('ids()', () => {
  it('should return and empty array by default', () => {
    const actual = ids(undefined, {})

    expect(actual).toEqual([])
  })

  it('should return an array of ids', () => {
    const response = normalize(posts, arrayOfPosts)
    const actual = ids(undefined, { type: 'FETCH_POSTS_SUCCESS', response })
    const expected = response.result

    expect(actual).toEqual(expected)
  })
})

describe('byId()', () => {
  it('should return an empty object by default', () => {
    const val = byId(undefined, {})

    expect(val).toEqual({})
  })

  it('should return an object of posts with the ids as keys', () => {
    const response = normalize(posts, arrayOfPosts)
    const actual = byId(undefined, { type: 'FETCH_POSTS_SUCCESS', response })
    const expected = response.entities.post

    expect(actual).toEqual(expected)
  })
})

describe('isFetching()', () => {
  it('should return false by default', () => {
    const actual = isFetching(undefined, {})

    expect(actual).toBe(false)
  })

  it('should return true when the action is "FETCH_POSTS"', () => {
    const actual = isFetching(undefined, { type: 'FETCH_POSTS' })

    expect(actual).toBe(true)
  })

  it('should return false when the action is either "FETCH_POSTS_SUCCESS" or "FETCH_POSTS_FAILURE', () => {
    let actual = isFetching(true, { type: 'FETCH_POSTS_SUCCESS' })
    expect(actual).toBe(false)

    actual = isFetching(true, { type: 'FETCH_POSTS_FAILURE' })
    expect(actual).toBe(false)
  })
})

describe('errorMessage()', () => {
  it('should return null by default', () => {
    const actual = errorMessage(undefined, {})

    expect(actual).toBe(null)
  })

  it('should return a string when the action is "FETCH_POSTS_FAILURE"', () => {
    const message = 'an error happened...'
    const actual = errorMessage(undefined, {
      type: 'FETCH_POSTS_FAILURE',
      message
    })

    expect(actual).toBe(message)
  })

  it('should return null when the action is "FETCH_POSTS_SUCCESS', () => {
    const actual = errorMessage('', { type: 'FETCH_POSTS_SUCCESS' })

    expect(actual).toBe(null)
  })
})
