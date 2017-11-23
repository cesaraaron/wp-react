import { fetchPosts } from './index'
import { apply, put, select } from 'redux-saga/effects'
import WPAPI from 'wpapi'
import { normalize } from 'normalizr'
import { arrayOfPosts } from './schema'
import { getEndpoint } from '../reducers'

describe('fetchPosts()', () => {
  const endpoint = 'http://localhost/'
  const api = new WPAPI({ endpoint })
  const gen = fetchPosts({ endpoint })

  it('should yield an effect `select(getEndpoint)`', () => {
    const actual = gen.next().value
    const expected = select(getEndpoint)

    expect(actual).toEqual(expected)
  })

  it('should yield an effect `call(api)`', () => {
    const actual = gen.next(endpoint).value
    const expected = apply(api, api.posts)

    expect(actual).toEqual(expected)
  })

  it('should yield an effect `put({ type: "FETCH_POSTS_SUCCESS", response })`', () => {
    const response = {}
    const actual = gen.next(response).value

    const expected = put({
      type: 'FETCH_POSTS_SUCCESS',
      response: normalize(response, arrayOfPosts)
    })

    expect(actual).toEqual(expected)
  })

  it('should yield an effect `put({ type: "FETCH_POSTS_FAILURE", message })`', () => {
    const error = { message: '' }
    const actual = gen.throw(error).value
    const expected = put({
      type: 'FETCH_POSTS_FAILURE',
      message: error.message
    })

    expect(actual).toEqual(expected)
  })
})
