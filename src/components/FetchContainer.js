import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import FetchError from './FetchError'
import * as types from '../actions/types'
import { getIsFetching, getErrorMessage } from '../reducers'
import { connect } from 'react-redux'

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
      render(this.props)
    )
  }
}

export default FetchContainer

export const connectWithFetchContainer = (
  mapStateToProps,
  mapDispatchToProps,
  { type, onMount, onUpdate, ...rest }
) => {
  const currentType = types[type]
  if (!currentType) {
    throw new Error(`Invalid type '${currentType}'`)
  }
  const newMapStateToProps = (state, ownProps) => {
    return {
      isFetching: getIsFetching(state, currentType),
      errorMessage: getErrorMessage(state, currentType),
      ...mapStateToProps(state, ownProps)
    }
  }

  return ComponentToRender => {
    const WrappedComponent = props => (
      <FetchContainer
        {...props}
        onMount={onMount}
        onUpdate={onUpdate}
        render={ownProps => <ComponentToRender {...ownProps} />}
      />
    )

    return connect(newMapStateToProps, mapDispatchToProps, ...rest)(
      WrappedComponent
    )
  }
}
