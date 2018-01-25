import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connectWithFetchContainer } from './components/FetchContainer'
import * as types from './actions/types'
import { fetchPostsByPageNumber } from './actions'
import { getTotalPages, getPostsForPage } from './reducers'
import { PagingLinks } from './components/PagingLinks'
import { Content } from './components/Content'
import Sidebar from './Sidebar'

export const Home = ({ data, totalPages, pageNumber }) => (
  <div>
    <Content data={data} />
    <Sidebar />
    <br />
    <PagingLinks isHome total={totalPages} activeIndex={pageNumber} />
  </div>
)

Home.propTypes = {
  data: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const pageNumber = Number(ownProps.match.params.pageNumber) || 1

  return {
    pageNumber,
    data: getPostsForPage(state, types.POSTS, pageNumber),
    totalPages: getTotalPages(state, types.POSTS)
  }
}

const onMount = ({ pageNumber, fetchPostsByPageNumber }) =>
  fetchPostsByPageNumber(pageNumber)
const onUpdate = ({ prevProps, currentProps }) =>
  currentProps.pageNumber !== prevProps.pageNumber &&
  currentProps.fetchPostsByPageNumber(currentProps.pageNumber)

export default withRouter(
  connectWithFetchContainer(
    mapStateToProps,
    { fetchPostsByPageNumber },
    { type: types.POSTS, onMount, onUpdate }
  )(Home)
)
