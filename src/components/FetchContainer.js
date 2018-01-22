import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import FetchError from './FetchError'

class FetchContainer extends React.Component {
  static defaultProps = {
    onUpdate: () => {}
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    onUpdate: PropTypes.func,
    onMount: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    render: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    this.props.onUpdate({ prevProps, currentProps: this.props })
  }

  componentDidMount() {
    this.props.onMount({ ...this.props })
  }

  render() {
    const { isFetching, errorMessage, render, data } = this.props

    return !data.length && isFetching ? (
      <Loading />
    ) : errorMessage ? (
      <FetchError message={errorMessage} />
    ) : (
      render()
    )
  }
}

export default FetchContainer
