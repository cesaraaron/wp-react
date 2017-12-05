import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import FetchContainer from './components/FetchContainer'
import * as types from './actions/types'
import { fetchPostsByCategorySlug } from './actions'
import {
  getErrorMessage,
  getIsFetching,
  getTotalPages,
  getPostsByPage
} from './reducers'

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

export const LinksGroup = ({ total }) => {
  const links = []
  for (var i = 1; i <= total; i++) {
    const to = i === 1 ? '/' : `/page/${i}`
    links.push(
      <Link style={{ padding: '5px' }} to={to} key={i}>
        {i}
      </Link>
    )
  }
  return <div>{links}</div>
}

LinksGroup.propTypes = {
  total: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired
}

export const Categories = ({ data, totalPages, pageNumber }) => (
  <div>
    {data.map(post => <Post {...post} key={post.id} />)}
    <br />
    <LinksGroup total={totalPages} activeIndex={pageNumber} />
  </div>
)

Categories.propTypes = {
  data: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
}

const HomeContainer = ({
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

HomeContainer.propTypes = {
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
    data: getPostsByPage(state, types.postsByCategory, pageNumber),
    totalPages: getTotalPages(state, types.postsByCategory),
    errorMessage: getErrorMessage(state, types.postsByCategory),
    isFetching: getIsFetching(state, types.postsByCategory)
  }
}

export default withRouter(
  connect(mapStateToProps, { fetchPostsByCategorySlug })(HomeContainer)
)
