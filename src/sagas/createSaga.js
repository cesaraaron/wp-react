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

      if (type === types.single) {
        const posts = api.posts()
        response = yield apply(posts, posts.slug, [action.slug])
      } else if (type === types.comments) {
        const comments = api.comments()
        response = yield apply(comments, comments.post, [action.postId])
      } else {
        response = yield apply(api, api.posts)
      }

      yield put({
        type: onFetch.success,
        response: normalize(response, arrayOfPosts)
      })
    } catch (e) {
      yield put({ type: onFetch.failure, message: e.message })
    }
  }
