import React from 'react'
import renderer from 'react-test-renderer'
import FetchContainer from './FetchContainer'

it('should render without crashing', () => {
  const component = renderer.create(
    <FetchContainer
      isFetching={false}
      data={[]}
      onMount={() => {}}
      render={() => null}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
