import { fetchPosts, fetchSingle } from './index'
import { apply, put, select } from 'redux-saga/effects'
import WPAPI from 'wpapi'
import { normalize } from 'normalizr'
import { arrayOfPosts } from './schema'
import { getEndpoint } from '../reducers'

describe('fetchPosts()', () => {
  const action = { pageNumber: 1 }
  const endpoint = 'http://localhost/'
  const api = new WPAPI({ endpoint })
  const gen = fetchPosts(action)

  it('should yield an effect `select(getEndpoint)`', () => {
    const actual = gen.next().value
    const expected = select(getEndpoint)

    expect(actual).toEqual(expected)
  })

  it('should yield an effect `call(api)`', () => {
    const actual = gen.next(endpoint).value
    const posts = api.posts()
    const expected = apply(posts, posts.page, [action.pageNumber])

    expect(actual).toEqual(expected)
  })

  it('should yield an effect `put({ type: "FETCH_POSTS_SUCCESS", response })`', () => {
    const response = {}
    const actual = gen.next(response).value

    const expected = put({
      type: 'FETCH_POSTS_SUCCESS',
      response: normalize(response, arrayOfPosts),
      pageNumber: action.pageNumber
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

describe('fetchSingle()', () => {
  const action = { slug: 'hello-world' }
  const endpoint = 'http://localhost/'
  const api = new WPAPI({ endpoint })
  const gen = fetchSingle(action)

  it('should yield an effect `select(getEndpoint)`', () => {
    const actual = gen.next().value
    const expected = select(getEndpoint)

    expect(actual).toEqual(expected)
  })

  it('should yield an effect `call(api)`', () => {
    const actual = gen.next(endpoint).value
    const posts = api.posts()
    const expected = apply(posts, posts.slug, [action.slug])

    expect(actual).toEqual(expected)
  })

  it('should yield an effect `put({ type: "FETCH_SINGLE_SUCCESS", response })`', () => {
    const response = {}
    const actual = gen.next(response).value

    const expected = put({
      type: 'FETCH_SINGLE_SUCCESS',
      response: normalize(response, arrayOfPosts)
    })

    expect(actual).toEqual(expected)
  })

  it('should yield an effect `put({ type: "FETCH_SINGLE_FAILURE", message })`', () => {
    const error = { message: '' }
    const actual = gen.throw(error).value
    const expected = put({
      type: 'FETCH_SINGLE_FAILURE',
      message: error.message
    })

    expect(actual).toEqual(expected)
  })
})
