import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connectWithFetchContainer } from './components/FetchContainer'
import * as types from './actions/types'
import { fetchPostsByCategorySlug } from './actions'
import { getTotalPages, getPostsForPage } from './reducers'
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

const mapStateToProps = (state, ownProps) => {
  const pageNumber = Number(ownProps.match.params.pageNumber) || 1
  const { slug } = ownProps.match.params

  return {
    pageNumber,
    slug,
    data: getPostsForPage({ state, pageNumber, type: types.POSTS_BY_CATEGORY }),
    totalPages: getTotalPages(state, types.POSTS_BY_CATEGORY)
  }
}

const onMount = ({ fetchPostsByCategorySlug, slug, pageNumber }) =>
  fetchPostsByCategorySlug(slug, pageNumber)

const onUpdate = ({ prevProps, currentProps }) =>
  prevProps.pageNumber !== currentProps.pageNumber &&
  currentProps.fetchPostsByCategorySlug(
    currentProps.slug,
    currentProps.pageNumber
  )

export default withRouter(
  connectWithFetchContainer(
    mapStateToProps,
    { fetchPostsByCategorySlug },
    { type: types.POSTS_BY_CATEGORY, onMount, onUpdate }
  )(Categories)
)
