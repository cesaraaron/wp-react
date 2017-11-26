import React from 'react'
import PropTypes from 'prop-types'

const FetchError = ({ message }) => (
  <div>Could not fetch the data. {message} </div>
)

FetchError.propTypes = {
  message: PropTypes.string.isRequired
}

export default FetchError
