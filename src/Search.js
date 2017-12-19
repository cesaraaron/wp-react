import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FetchContainer from './components/FetchContainer'
import * as types from './actions/types'
import { fetchPostsBySearchQuery } from './actions'
import {
  getErrorMessage,
  getIsFetching,
  getTotalPages,
  getPostsByPage
} from './reducers'
import { PagingLinks } from './components/PagingLinks'
import { Content } from './components/Content'
import { parse } from 'qs'

export const Search = ({ data, totalPages, pageNumber }) => (
  <div>
    <Content title="Search" data={data} />
    <br />
    <PagingLinks total={totalPages} activeIndex={pageNumber} />
  </div>
)

Search.propTypes = {
  data: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
}

const SearchContainer = ({
  fetchPostsBySearchQuery,
  query,
  pageNumber,
  data,
  ...rest
}) => (
  <FetchContainer
    hasData={data.length > 0}
    pageNumber={pageNumber}
    onUpdate={prevProps =>
      prevProps.pageNumber !== pageNumber &&
      fetchPostsBySearchQuery(query, pageNumber)}
    onMount={() => fetchPostsBySearchQuery(query, pageNumber)}
    render={() => <Search pageNumber={pageNumber} data={data} {...rest} />}
    {...rest}
  />
)

SearchContainer.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  fetchPostsBySearchQuery: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const query = parse(ownProps.location.search.substr(1)).q
  const pageNumber = Number(ownProps.match.params.pageNumber) || 1

  return {
    pageNumber,
    query,
    data: getPostsByPage(state, types.searchQuery, pageNumber),
    totalPages: getTotalPages(state, types.searchQuery),
    errorMessage: getErrorMessage(state, types.searchQuery),
    isFetching: getIsFetching(state, types.searchQuery)
  }
}

export default withRouter(
  connect(mapStateToProps, { fetchPostsBySearchQuery })(SearchContainer)
)
