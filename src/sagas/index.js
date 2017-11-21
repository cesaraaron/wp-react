import WPAPI from 'wpapi'
import { apply, put, takeLatest, all } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import { arrayOfPosts } from './schema'

export function* fetchPosts(action) {
  const api = new WPAPI({ endpoint: action.endpoint })
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

export default function*() {
  yield all([watchFetchPosts()])
}
