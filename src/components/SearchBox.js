import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { stringify, parse } from 'qs'
import debounce from 'lodash/debounce'

const SearchBox = ({ history, location }) => {
  const query = parse(location.search.substr(1)).q
  let input

  return (
    <input
      ref={node => (input = node)}
      type="text"
      defaultValue={query}
      onChange={debounce(() => {
        history.push(`/search?${stringify({ q: input.value })}`)
      }, 500)}
    />
  )
}

SearchBox.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default withRouter(SearchBox)
