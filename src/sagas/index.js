import { takeLatest, all } from 'redux-saga/effects'
import { types } from '../actions'
import createSaga from './createSaga'

export const fetchPosts = createSaga(types.posts)

export function* watchFetchPosts() {
  yield takeLatest(types.FETCH_POSTS_REQUEST, fetchPosts)
}

export const fetchSingle = createSaga(types.single)

export function* watchFetchSingle() {
  yield takeLatest(types.FETCH_SINGLE_REQUEST, fetchSingle)
}

export default function*() {
  yield all([watchFetchPosts(), watchFetchSingle()])
}
