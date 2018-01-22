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
  getPostsForPage
} from './reducers'
import { PagingLinks } from './components/PagingLinks'
import { Content } from './components/Content'
import { parse } from 'qs'
import Sidebar from './Sidebar'

export const Search = ({ data, totalPages, pageNumber }) => (
  <div>
    <Content title="Search" data={data} />
    <br />
    <Sidebar />
    <PagingLinks total={totalPages} activeIndex={pageNumber} />
  </div>
)

Search.propTypes = {
  data: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
}

const SearchContainer = ({ fetchPostsBySearchQuery, ...rest }) => (
  <FetchContainer
    onUpdate={({ prevProps, currentProps }) =>
      currentProps.query &&
      (currentProps.pageNumber !== prevProps.pageNumber ||
        currentProps.query !== prevProps.query) &&
      fetchPostsBySearchQuery(currentProps.query, currentProps.pageNumber)}
    onMount={({ query, pageNumber }) =>
      query && fetchPostsBySearchQuery(query, pageNumber)}
    render={() => <Search {...rest} />}
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
  const query = parse(ownProps.location.search.substr(1)).q || ''
  const pageNumber = Number(ownProps.match.params.pageNumber) || 1

  return {
    pageNumber,
    query,
    data: getPostsForPage(state, types.searchQuery, pageNumber),
    totalPages: getTotalPages(state, types.searchQuery),
    errorMessage: getErrorMessage(state, types.searchQuery),
    isFetching: getIsFetching(state, types.searchQuery)
  }
}

export default withRouter(
  connect(mapStateToProps, { fetchPostsBySearchQuery })(SearchContainer)
)
