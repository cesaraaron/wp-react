import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import FetchContainer from './components/FetchContainer'
import * as types from './actions/types'
import { fetchPostsByPageNumber } from './actions'
import {
  getData,
  getErrorMessage,
  getIsFetching,
  getTotalPages
} from './reducers'
import { PagingLinks } from './components/PagingLinks'

const Post = ({ title, content, slug }) => {
  return (
    <article>
      <h4>
        <Link to={`/${slug}`}>{title.rendered}</Link>
      </h4>
      <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired
}

export { Post }

export const Home = ({ data, totalPages, pageNumber }) => (
  <div>
    {data.map(post => <Post {...post} key={post.id} />)}
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
    data: getData(state, types.posts, { pageNumber }),
    totalPages: getTotalPages(state, types.posts),
    errorMessage: getErrorMessage(state, types.posts),
    isFetching: getIsFetching(state, types.posts)
  }
}

export default withRouter(
  connect(mapStateToProps, { fetchPostsByPageNumber })(HomeContainer)
)
