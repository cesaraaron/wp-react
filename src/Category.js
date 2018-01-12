import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FetchContainer from './components/FetchContainer'
import * as types from './actions/types'
import { fetchPostsByCategorySlug } from './actions'
import {
  getErrorMessage,
  getIsFetching,
  getTotalPages,
  getPostsForPage
} from './reducers'
import { PagingLinks } from './components/PagingLinks'
import { Content } from './components/Content'

export const Categories = ({ data, totalPages, pageNumber }) => (
  <div>
    <Content title="Categories" data={data} />
    <br />
    <PagingLinks total={totalPages} activeIndex={pageNumber} />
  </div>
)

Categories.propTypes = {
  data: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
}

const CategoriesContainer = ({
  fetchPostsByCategorySlug,
  slug,
  pageNumber,
  data,
  ...rest
}) => (
  <FetchContainer
    hasData={data.length > 0}
    pageNumber={pageNumber}
    onUpdate={prevProps =>
      prevProps.pageNumber !== pageNumber &&
      fetchPostsByCategorySlug(slug, pageNumber)}
    onMount={() => fetchPostsByCategorySlug(slug, pageNumber)}
    render={() => <Categories pageNumber={pageNumber} data={data} {...rest} />}
    {...rest}
  />
)

CategoriesContainer.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  slug: PropTypes.string.isRequired,
  fetchPostsByCategorySlug: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const pageNumber = Number(ownProps.match.params.pageNumber) || 1
  const { slug } = ownProps.match.params

  return {
    pageNumber,
    slug,
    data: getPostsForPage(state, types.postsByCategory, pageNumber),
    totalPages: getTotalPages(state, types.postsByCategory),
    errorMessage: getErrorMessage(state, types.postsByCategory),
    isFetching: getIsFetching(state, types.postsByCategory)
  }
}

export default withRouter(
  connect(mapStateToProps, { fetchPostsByCategorySlug })(CategoriesContainer)
)
