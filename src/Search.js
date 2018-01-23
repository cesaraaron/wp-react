import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connectWithFetchContainer } from './components/FetchContainer'
import * as types from './actions/types'
import { fetchPostsBySearchQuery } from './actions'
import { getTotalPages, getPostsForPage } from './reducers'
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

const mapStateToProps = (state, ownProps) => {
  const query = parse(ownProps.location.search.substr(1)).q || ''
  const pageNumber = Number(ownProps.match.params.pageNumber) || 1

  return {
    pageNumber,
    query,
    data: getPostsForPage(state, types.searchQuery, pageNumber),
    totalPages: getTotalPages(state, types.searchQuery)
  }
}

const onUpdate = ({ prevProps, currentProps }) =>
  currentProps.query &&
  (currentProps.pageNumber !== prevProps.pageNumber ||
    currentProps.query !== prevProps.query) &&
  currentProps.fetchPostsBySearchQuery(
    currentProps.query,
    currentProps.pageNumber
  )

const onMount = ({ fetchPostsBySearchQuery, query, pageNumber }) =>
  query && fetchPostsBySearchQuery(query, pageNumber)

export default withRouter(
  connectWithFetchContainer(
    mapStateToProps,
    { fetchPostsBySearchQuery },
    { type: types.searchQuery, onMount, onUpdate }
  )(Search)
)
