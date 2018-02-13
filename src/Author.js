import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connectWithFetchContainer } from './components/FetchContainer'
import * as types from './actions/types'
import { fetchUserWithSlugAndThenItsPosts } from './actions'
import {
  getTotalPages,
  getUserWithSlug,
  getPostsForAuthorWithSlug
} from './reducers'
import { PagingLinks } from './components/PagingLinks'
import { Content } from './components/Content'

export const Author = ({ data, totalPages, pageNumber }) => (
  <div>
    <Content title="Author" data={data} />
    <br />
    <PagingLinks total={totalPages} activeIndex={pageNumber} />
  </div>
)

Author.propTypes = {
  data: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  authorSlug: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const pageNumber = Number(ownProps.match.params.pageNumber) || 1
  const { authorSlug } = ownProps.match.params

  const [user = {}] = getUserWithSlug(state, authorSlug)
  return {
    pageNumber,
    authorSlug,
    data: getPostsForAuthorWithSlug(state, authorSlug),
    totalPages: getTotalPages({
      state,
      type: types.POSTS_BY_AUTHOR,
      authorId: user.id
    })
  }
}

export default withRouter(
  connectWithFetchContainer(mapStateToProps, undefined, {
    type: types.POSTS_BY_AUTHOR,
    onMount: ({ dispatch, authorSlug, pageNumber }) => {
      dispatch(fetchUserWithSlugAndThenItsPosts(authorSlug, pageNumber))
    },
    onUpdate: ({ prevProps, currentProps }) =>
      prevProps.pageNumber !== currentProps.pageNumber &&
      currentProps.dispatch(
        fetchUserWithSlugAndThenItsPosts(
          currentProps.authorSlug,
          currentProps.pageNumber
        )
      )
  })(Author)
)
