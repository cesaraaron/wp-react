import { takeLatest, all } from 'redux-saga/effects'
import { types } from '../actions'
import createSaga from './createSaga'

export const fetchPosts = createSaga(types.posts)

export const fetchSingle = createSaga(types.single)

export const fetchComments = createSaga(types.comments)

export default function*() {
  yield all([
    yield takeLatest(types.FETCH_POSTS_REQUEST, fetchPosts),
    yield takeLatest(types.FETCH_SINGLE_REQUEST, fetchSingle),
    yield takeLatest(types.FETCH_COMMENTS_REQUEST, fetchComments)
  ])
}
