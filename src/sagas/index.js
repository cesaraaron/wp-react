import WPAPI from 'wpapi'
import { apply, put, takeLatest, all, select } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import { arrayOfPosts } from './schema'
import { getEndpoint } from '../reducers'

export function* fetchPosts() {
  const endpoint = yield select(getEndpoint)
  const api = new WPAPI({ endpoint })

  try {
    const response = yield apply(api, api.posts)

    yield put({
      type: 'FETCH_POSTS_SUCCESS',
      response: normalize(response, arrayOfPosts)
    })
  } catch (e) {
    yield put({ type: 'FETCH_POSTS_FAILURE', message: e.message })
  }
}

export function* watchFetchPosts() {
  yield takeLatest('FETCH_POSTS', fetchPosts)
}

export function* fetchSingle(action) {
  const endpoint = yield select(getEndpoint)
  const api = new WPAPI({ endpoint })

  try {
    const posts = api.posts()
    const response = yield apply(posts, posts.slug, [action.slug])

    yield put({
      type: 'FETCH_SINGLE_SUCCESS',
      response: normalize(response, arrayOfPosts)
    })
  } catch (e) {
    yield put({ type: 'FETCH_SINGLE_FAILURE', message: e.message })
  }
}

export function* watchFetchSingle() {
  yield takeLatest('FETCH_SINGLE', fetchSingle)
}

export default function*() {
  yield all([watchFetchPosts(), watchFetchSingle()])
}
