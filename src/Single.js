import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as types from './actions/types'
import { fetchSingleBySlug } from './actions'
import FetchContainer from './components/FetchContainer'
import { getSingleWithSlug, getErrorMessage, getIsFetching } from './reducers'
import Comments from './Comments'
import { Content } from './components/Content'

const Single = ({ data }) => (
  <div>
    <Content isSingle data={data} />
    <br />
    <h2>Comments</h2>
    {data.length ? <Comments postId={data[0].id} /> : null}
  </div>
)

Single.propTypes = {
  data: PropTypes.array.isRequired
}

const SingleContainer = ({ fetchSingleBySlug, ...rest }) => (
  <FetchContainer
    onMount={({ slug }) => fetchSingleBySlug(slug)}
    render={() => <Single {...rest} />}
    {...rest}
  />
)

SingleContainer.propTypes = {
  data: PropTypes.array.isRequired,
  fetchSingleBySlug: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params
  return {
    data: getSingleWithSlug(state, slug),
    errorMessage: getErrorMessage(state, types.single),
    isFetching: getIsFetching(state, types.single),
    slug
  }
}

export default withRouter(
  connect(mapStateToProps, { fetchSingleBySlug })(SingleContainer)
)
