import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { Post } from '../Posts'
import { posts } from '../data/SampleData'

it('should render a post', () => {
  const component = renderer.create(
    <MemoryRouter>
      <Post {...posts[0]} />
    </MemoryRouter>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
