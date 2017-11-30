import WPAPI from 'wpapi'
import { apply, put, select } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import { arrayOfPosts } from './schema'
import { getEndpoint } from '../reducers'
import { types } from '../actions'
import { createOnFetchVars } from '../actions/types'

export default type =>
  function*(action) {
    const onFetch = createOnFetchVars(type)

    const endpoint = yield select(getEndpoint)
    const api = new WPAPI({ endpoint })

    try {
      let response

      switch (type) {
        case types.posts:
          {
            const posts = api.posts()
            response = yield apply(posts, posts.page, [action.pageNumber])
          }
          break
        case types.single:
          {
            const posts = api.posts()
            response = yield apply(posts, posts.slug, [action.slug])
          }
          break
        case types.comments:
          {
            const comments = api.comments()
            response = yield apply(comments, comments.post, [action.postId])
          }
          break
        default:
          break
      }

      const normalizedResponse = normalize(response, arrayOfPosts)

      let pageNumber

      if (type === types.posts) {
        normalizedResponse._paging = response._paging
        pageNumber = action.pageNumber
      }

      yield put({
        type: onFetch.success,
        response: normalizedResponse,
        pageNumber
      })
    } catch (e) {
      yield put({ type: onFetch.failure, message: e.message })
    }
  }
