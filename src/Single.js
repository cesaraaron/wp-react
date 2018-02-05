import React from 'react'
import PropTypes from 'prop-types'
import * as types from './actions/types'
import { fetchSingleBySlug } from './actions'
import { connectWithFetchContainer } from './components/FetchContainer'
import { withRouter } from 'react-router-dom'
import { getSingleWithSlug } from './reducers'
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

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params
  return {
    data: getSingleWithSlug(state, slug),
    slug
  }
}

const onMount = ({ dispatch, slug }) => dispatch(fetchSingleBySlug(slug))

export default withRouter(
  connectWithFetchContainer(mapStateToProps, undefined, {
    type: types.SINGLE,
    onMount
  })(Single)
)
