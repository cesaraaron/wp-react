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

export default function*() {
  yield all([watchFetchPosts()])
}
