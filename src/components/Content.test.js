import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { posts } from '../data/SampleData'
import { Post } from './Content'

describe('<Post />', () => {
  it('should render a post', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Post {...posts[0]} />
      </MemoryRouter>
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render a post with a plain title when isSingle prop is passed', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Post {...posts[0]} isSingle />
      </MemoryRouter>
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
