import React from 'react'
import renderer from 'react-test-renderer'
import { Single } from '../Single'
import { posts } from '../data/SampleData'

it('should render a post', () => {
  const component = renderer.create(<Single {...posts[0]} />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
