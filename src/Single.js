import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchSingle } from './actions'
import Container from './components/Container'
import {
  getSingle,
  getSingleErrorMessage,
  getIsFetchingSingle
} from './reducers'

const Single = ({ title, content }) => {
  return (
    <article>
      <h4>{title.rendered}</h4>
      <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
    </article>
  )
}

Single.propTypes = {
  title: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
}

export { Single }

// FETCH_SINGLE action creator.
const SingleContainer = ({ dispatch, data, slug, ...rest }) => (
  <Container
    noDataYet={data.length === 0}
    dispatch={() => dispatch(fetchSingle(slug))}
    render={() => data.map(single => <Single {...single} key={single.id} />)}
    {...rest}
  />
)

SingleContainer.propTypes = {
  data: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired
}

// see if I can move connect & withRouter to container
const mapStateToProps = (state, ownProps) => ({
  slug: ownProps.match.params.slug,
  data: getSingle(state, ownProps.match.params.slug),
  errorMessage: getSingleErrorMessage(state),
  isFetching: getIsFetchingSingle(state)
})

export default withRouter(connect(mapStateToProps)(SingleContainer))
