import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getIsFetchingPosts, getPosts } from './reducers/index'
import * as actions from './actions'

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
    // this.props.fetchPosts()
  }

  render() {
    const { posts, isFetching } = this.props

    if (isFetching && !posts.length) {
      return <div>Loading...</div>
    }

    return posts.map(post => <Post {...post} key={post.id} />)
  }
}

Posts.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  // fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  isFetching: getIsFetchingPosts(state),
  posts: getPosts(state)
})

export default connect(mapStateToProps, actions)(Posts)
