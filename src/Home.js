import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FetchContainer from './components/FetchContainer'
import * as types from './actions/types'
import { fetchPostsByPageNumber } from './actions'
import {
  getErrorMessage,
  getIsFetching,
  getTotalPages,
  getPostsForPage
} from './reducers'
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

const HomeContainer = ({
  fetchPostsByPageNumber,
  pageNumber,
  data,
  ...rest
}) => (
  <FetchContainer
    hasData={data.length > 0}
    pageNumber={pageNumber}
    onUpdate={prevProps =>
      prevProps.pageNumber !== pageNumber && fetchPostsByPageNumber(pageNumber)}
    onMount={() => fetchPostsByPageNumber(pageNumber)}
    render={() => <Home pageNumber={pageNumber} data={data} {...rest} />}
    {...rest}
  />
)

HomeContainer.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  fetchPostsByPageNumber: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const pageNumber = Number(ownProps.match.params.pageNumber) || 1

  return {
    pageNumber,
    data: getPostsForPage(state, types.posts, pageNumber),
    totalPages: getTotalPages(state, types.posts),
    errorMessage: getErrorMessage(state, types.posts),
    isFetching: getIsFetching(state, types.posts)
  }
}

export default withRouter(
  connect(mapStateToProps, { fetchPostsByPageNumber })(HomeContainer)
)
