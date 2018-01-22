import React from 'react'
import renderer from 'react-test-renderer'
import { Comment, CommentList } from '../Comments'
import { comments } from '../utils/SampleData'

it('should render a comment', () => {
  const component = renderer.create(<Comment {...comments[0]} />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render a list of comments', () => {
  const component = renderer.create(<CommentList data={comments} />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
