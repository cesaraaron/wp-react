import React from 'react'
import PropTypes from 'prop-types'
import Container from './components/Container'
import { connect } from 'react-redux'
import { getErrorMessage, getIsFetching, getData } from './reducers'
import { types, fetchComments } from './actions'

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

const CommentListContainer = ({ dispatch, data, postId, ...rest }) => (
  <Container
    noDataYet={data.length === 0}
    dispatch={() => dispatch(fetchComments(postId))}
    render={() => <CommentList comments={data} />}
    {...rest}
  />
)

CommentListContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
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

export default connect(mapStateToProps)(CommentListContainer)
