import React from 'react'
import PropTypes from 'prop-types'
import FetchContainer from './components/FetchContainer'
import { connect } from 'react-redux'
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

export const CommentList = ({ comments }) =>
  comments
    .filter(c => c.status === 'approved')
    .map(c => <Comment {...c} key={c.id} />)

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
}

const CommentListContainer = ({
  fetchCommentsByPostId,
  data,
  postId,
  ...rest
}) => (
  <FetchContainer
    hasData={data.length > 0}
    onMount={() => fetchCommentsByPostId(postId)}
    render={() => <CommentList comments={data} />}
    {...rest}
  />
)

CommentListContainer.propTypes = {
  fetchCommentsByPostId: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  postId: PropTypes.number.isRequired
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

export default connect(mapStateToProps, { fetchCommentsByPostId })(
  CommentListContainer
)
