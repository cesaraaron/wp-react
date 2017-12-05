import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import FetchError from './FetchError'

class FetchContainer extends React.Component {
  static defaultProps = {
    onUpdate: () => {}
  }

  static propTypes = {
    onUpdate: PropTypes.func,
    onMount: PropTypes.func.isRequired,
    hasData: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    render: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    this.props.onUpdate(prevProps)
  }

  componentDidMount() {
    this.props.onMount()
  }

  render() {
    const { isFetching, errorMessage, render, hasData } = this.props

    return isFetching && !hasData ? (
      <Loading />
    ) : errorMessage ? (
      <FetchError message={errorMessage} />
    ) : (
      render()
    )
  }
}

export default FetchContainer
