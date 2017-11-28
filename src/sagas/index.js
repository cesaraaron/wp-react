import { takeLatest, all } from 'redux-saga/effects'
import { types } from '../actions'
import createSaga from './createSaga'

export const fetchPosts = createSaga(types.posts)

function* watchFetchPosts() {
  yield takeLatest(types.FETCH_POSTS_REQUEST, fetchPosts)
}

export const fetchSingle = createSaga(types.single)

function* watchFetchSingle() {
  yield takeLatest(types.FETCH_SINGLE_REQUEST, fetchSingle)
}

export const fetchComments = createSaga(types.comments)

function* watchFetchComments() {
  yield takeLatest(types.FETCH_COMMENTS_REQUEST, fetchComments)
}

export default function*() {
  yield all([watchFetchPosts(), watchFetchSingle(), watchFetchComments()])
}
