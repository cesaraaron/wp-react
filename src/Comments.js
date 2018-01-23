import React from 'react'
import PropTypes from 'prop-types'
import { connectWithFetchContainer } from './components/FetchContainer'
import { getErrorMessage, getIsFetching, getCommentsForPost } from './reducers'
import * as types from './actions/types'
import { fetchCommentsByPostId } from './actions'

export const Comment = ({ author_name, content }) => (
  <div>
    <div>{author_name}</div>
    <p>{content.rendered}</p>
  </div>
)

Comment.propTypes = {
  author_name: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired
}

export const CommentList = ({ data }) =>
  data
    .filter(c => c.status === 'approved')
    .map(c => <Comment {...c} key={c.id} />)

CommentList.propTypes = {
  data: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps
  return {
    postId,
    data: getCommentsForPost(state, postId),
    errorMessage: getErrorMessage(state, types.comments),
    isFetching: getIsFetching(state, types.comments)
  }
}

const onMount = ({ fetchCommentsByPostId, postId }) =>
  fetchCommentsByPostId(postId)

export default connectWithFetchContainer(
  mapStateToProps,
  { fetchCommentsByPostId },
  { type: types.comments, onMount }
)(CommentList)
