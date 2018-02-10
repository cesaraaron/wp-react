import React from 'react'
import renderer from 'react-test-renderer'
import PageContainer from './Page'
import { pages } from './utils/SampleData'
import rootReducer from './reducers'
import { MemoryRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { normalize } from 'normalizr'
import { arrayOfPosts } from './actions/schema'

describe('<PageContainer />', () => {
  const { entities } = normalize(pages, arrayOfPosts)
  const preloadedState = {
    pagesById: entities.post
  }
  const store = createStore(rootReducer, preloadedState)
  store.dispatch = () => {}

  it('should render without errors', () => {
    const component = renderer.create(
      <MemoryRouter initialEntries={['/sample-page']} initialIndex={0}>
        <Provider store={store}>
          <Route path="/:slug" component={PageContainer} />
        </Provider>
      </MemoryRouter>
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
