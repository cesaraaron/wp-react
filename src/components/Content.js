import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const Post = ({ title, content, slug, isSingle }) => {
  const newTitle = isSingle ? (
    title.rendered
  ) : (
    <Link to={`/${slug}`}>{title.rendered}</Link>
  )
  return (
    <article>
      <h4>{newTitle}</h4>
      <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
    </article>
  )
}

Post.propTypes = {
  isSingle: PropTypes.bool,
  title: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired
}

export const Content = ({ data, isSingle, title }) => (
  <div>
    {title ? (
      <div>
        <h2>{title}</h2>
        <hr />
      </div>
    ) : null}
    <div>
      {data.map(post => <Post isSingle={isSingle} {...post} key={post.id} />)}
    </div>
  </div>
)

Content.propTypes = {
  data: PropTypes.array.isRequired,
  isSingle: PropTypes.bool,
  title: PropTypes.string
}
