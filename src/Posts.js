import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Container from './components/Container'
import { fetchPosts } from './actions'
import { getIsFetchingPosts, getPosts, getPostsErrorMessage } from './reducers'

const Post = ({ title, content, slug }) => {
  return (
    <article>
      <h4>
        <Link to={slug}>{title.rendered}</Link>
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

const Posts = ({ dispatch, data, ...rest }) => (
  <Container
    noDataYet={data.length === 0}
    dispatch={() => dispatch(fetchPosts())}
    {...rest}
  >
    {() => data.map(post => <Post {...post} key={post.id} />)}
  </Container>
)

Posts.propTypes = {
  data: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errorMessage: getPostsErrorMessage(state),
  isFetching: getIsFetchingPosts(state),
  data: getPosts(state)
})

export default connect(mapStateToProps)(Posts)
