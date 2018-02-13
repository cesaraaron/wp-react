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
    data: getPostsForPage({ state, pageNumber, type: types.POSTS }),
    totalPages: getTotalPages({ state, type: types.POSTS })
  }
}

export default withRouter(
  connectWithFetchContainer(mapStateToProps, undefined, {
    type: types.POSTS,
    onMount: ({ pageNumber, dispatch }) =>
      dispatch(fetchPostsByPageNumber(pageNumber)),
    onUpdate: ({ prevProps, currentProps }) =>
      currentProps.pageNumber !== prevProps.pageNumber &&
      currentProps.dispatch(fetchPostsByPageNumber(currentProps.pageNumber))
  })(Home)
)
