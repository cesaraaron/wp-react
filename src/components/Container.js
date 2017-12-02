import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import FetchError from './FetchError'

class Container extends React.Component {
  static propTypes = {
    onMount: PropTypes.func,
    onUpdate: PropTypes.func,
    noDataYet: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    render: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { onUpdate } = this.props
    onUpdate && onUpdate(prevProps)
  }

  componentDidMount() {
    this.props.dispatch()
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

export default Container
