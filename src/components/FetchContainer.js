import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import FetchError from './FetchError'

class FetchContainer extends React.Component {
  static propTypes = {
    onUpdate: PropTypes.func,
    onMount: PropTypes.func.isRequired,
    noDataYet: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    render: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    this.props.onUpdate && this.props.onUpdate(prevProps)
  }

  componentDidMount() {
    this.props.onMount && this.props.onMount()
  }

  render() {
    const { isFetching, errorMessage, render, noDataYet } = this.props

    if (isFetching && noDataYet) {
      return <Loading />
    }

    if (errorMessage) {
      return <FetchError message={errorMessage} />
    }

    return render()
  }
}

export default FetchContainer
