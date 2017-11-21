import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getIsFetchingPosts,
  getPosts,
  getEndpoint,
  getPostsErrorMessage
} from './reducers'

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

class Posts extends React.Component {
  componentDidMount() {
    const { dispatch, endpoint } = this.props

    dispatch({ type: 'FETCH_POSTS', endpoint })
  }

  render() {
    const { posts, isFetching, errorMessage } = this.props

    if (isFetching && posts.length === 0) {
      return <div>Loading...</div>
    }

    if (errorMessage) {
      return <div>Could not fetch the posts. {errorMessage} </div>
    }

    return posts.map(post => <Post {...post} key={post.id} />)
  }
}

Posts.propTypes = {
  endpoint: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  endpoint: getEndpoint(state),
  errorMessage: getPostsErrorMessage(state),
  isFetching: getIsFetchingPosts(state),
  posts: getPosts(state)
})

export default connect(mapStateToProps)(Posts)
