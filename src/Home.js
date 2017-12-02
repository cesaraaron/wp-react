import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import FetchContainer from './components/FetchContainer'
import { fetchPosts, types } from './actions'
import {
  getData,
  getErrorMessage,
  getIsFetching,
  getTotalPages
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

export const Home = ({ data, totalPages, pageNumber }) => (
  <div>
    {data.map(post => <Post {...post} key={post.id} />)}
    <br />
    <LinksGroup total={totalPages} activeIndex={pageNumber} />
  </div>
)

Home.propTypes = {
  data: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
}

const HomeContainer = ({ fetchPosts, pageNumber, data, ...rest }) => (
  <FetchContainer
    noDataYet={data.length === 0}
    pageNumber={pageNumber}
    onUpdate={prevProps => {
      if (pageNumber !== prevProps.pageNumber) {
        fetchPosts(pageNumber)
      }
    }}
    onMount={() => fetchPosts(pageNumber)}
    render={() => <Home pageNumber={pageNumber} data={data} {...rest} />}
    {...rest}
  />
)

HomeContainer.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  fetchPosts: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const pageNumber = Number(ownProps.match.params.pageNumber) || 1

  return {
    pageNumber,
    data: getData(state, types.posts, { pageNumber }),
    totalPages: getTotalPages(state),
    errorMessage: getErrorMessage(state, types.posts),
    isFetching: getIsFetching(state, types.posts)
  }
}

export default withRouter(
  connect(mapStateToProps, { fetchPosts })(HomeContainer)
)
