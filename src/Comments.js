import React from 'react'
import PropTypes from 'prop-types'
import FetchContainer from './components/FetchContainer'
import { connect } from 'react-redux'
import { getErrorMessage, getIsFetching, getData } from './reducers'
import * as types from './actions/types'
import { fetchComments } from './actions'

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

const CommentListContainer = ({ fetchComments, data, postId, ...rest }) => (
  <FetchContainer
    noDataYet={data.length === 0}
    onMount={() => fetchComments(postId)}
    render={() => <CommentList comments={data} />}
    {...rest}
  />
)

CommentListContainer.propTypes = {
  fetchComments: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  postId: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps
  return {
    data: getData(state, types.comments),
    errorMessage: getErrorMessage(state, types.comments),
    isFetching: getIsFetching(state, types.comments),
    postId
  }
}

export default connect(mapStateToProps, { fetchComments })(CommentListContainer)
