import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Container from './components/Container'
import { fetchPosts, types } from './actions'
import { getData, getErrorMessage, getIsFetching } from './reducers'

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
    render={() => data.map(post => <Post {...post} key={post.id} />)}
    {...rest}
  />
)

Posts.propTypes = {
  data: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errorMessage: getErrorMessage(state, types.posts),
  isFetching: getIsFetching(state, types.posts),
  data: getData(state, types.posts)
})

export default connect(mapStateToProps)(Posts)
