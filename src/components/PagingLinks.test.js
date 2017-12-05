import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { PagingLinks } from './PagingLinks'

test('PagingLinks.js', () => {
  const component = renderer.create(
    <MemoryRouter>
      <PagingLinks total={5} activeIndex={2} />
    </MemoryRouter>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
