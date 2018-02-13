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
    data: getPostsForPage({ state, pageNumber, type: types.SEARCH_QUERY }),
    totalPages: getTotalPages({ state, type: types.SEARCH_QUERY })
  }
}

export default withRouter(
  connectWithFetchContainer(mapStateToProps, undefined, {
    type: types.SEARCH_QUERY,
    onMount: ({ dispatch, query, pageNumber }) =>
      query && dispatch(fetchPostsBySearchQuery(query, pageNumber)),
    onUpdate: ({ prevProps, currentProps }) =>
      currentProps.query &&
      (currentProps.pageNumber !== prevProps.pageNumber ||
        currentProps.query !== prevProps.query) &&
      currentProps.dispatch(
        fetchPostsBySearchQuery(currentProps.query, currentProps.pageNumber)
      )
  })(Search)
)
