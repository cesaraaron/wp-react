import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchSingle, types } from './actions'
import Container from './components/Container'
import { getData, getErrorMessage, getIsFetching } from './reducers'
import Comments from './Comments'

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

const SingleWithComments = props => (
  <div>
    <Single {...props} />
    <br />
    <h2>Comments</h2>
    <Comments
      // eslint-disable-next-line react/prop-types
      postId={props.id}
    />
  </div>
)

// FETCH_SINGLE action creator.
const SingleContainer = ({ dispatch, data, slug, ...rest }) => (
  <Container
    noDataYet={data.length === 0}
    dispatch={() => dispatch(fetchSingle(slug))}
    render={() =>
      data.map(single => <SingleWithComments {...single} key={single.id} />)}
    {...rest}
  />
)

SingleContainer.propTypes = {
  data: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired
}

// see if I can move connect & withRouter to container
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params
  return {
    data: getData(state, types.single, { slug }),
    errorMessage: getErrorMessage(state, types.single),
    isFetching: getIsFetching(state, types.single),
    slug
  }
}

export default withRouter(connect(mapStateToProps)(SingleContainer))
