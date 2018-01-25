import { createIdsByPage, getPostsForPage } from '../idsByPage'
import * as types from '../../../actions/types'
import { normalize } from 'normalizr'
import { arrayOfPosts } from '../../../actions/schema'
import { posts } from '../../../utils/SampleData'

const response = normalize(posts, arrayOfPosts)

describe('createIdsByPage()', () => {
  const idsByPage = createIdsByPage(types.POSTS)

  it('should return an empty object', () => {
    const actual = idsByPage(undefined, {})

    expect(actual).toEqual({})
  })

  it('should return an object with keys pointing at arrays', () => {
    const pageNumber = 1
    const actual = idsByPage(undefined, {
      type: types.FETCH_POSTS_SUCCESS,
      response,
      pageNumber
    })

    expect(actual).toEqual({ [pageNumber]: response.result })
  })

  it('should merge the state object with the action.response', () => {
    const actual = idsByPage(
      { 1: response.result },
      { type: types.FETCH_POSTS_SUCCESS, pageNumber: 2, response }
    )

    expect(actual).toEqual({ 1: response.result, 2: response.result })
  })
})

describe('getPostsForPage()', () => {
  it('should return an empty array if the state object is empty', () => {
    const actual = getPostsForPage({}, 1, {})
    expect(actual).toEqual([])
  })

  it('should get the posts given as params the pageNumber & byId', () => {
    const pageNumber = 1
    const postId = 1
    const state = { [pageNumber]: [postId] }
    const byId = { [postId]: { title: 'post title' } }
    const actual = getPostsForPage(state, pageNumber, byId)

    expect(actual).toEqual([{ title: 'post title' }])
  })
})
