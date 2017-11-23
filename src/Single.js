import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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

class SingleContainer extends React.Component {
  componentDidMount() {
    const { dispatch, slug } = this.props
    dispatch({ type: 'FETCH_SINGLE', slug })
  }

  render() {
    const { data, isFetching, errorMessage } = this.props

    if (isFetching && data.length === 0) {
      return <div>Loading...</div>
    }

    if (errorMessage) {
      return <div>Could not fetch the posts. {errorMessage} </div>
    }

    return data.map(single => <Single {...single} key={single.id} />)
  }
}

SingleContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  slug: ownProps.match.params.slug,
  data: getSingle(state, ownProps.match.params.slug),
  errorMessage: getSingleErrorMessage(state),
  isFetching: getIsFetchingSingle(state)
})

export default withRouter(connect(mapStateToProps)(SingleContainer))
