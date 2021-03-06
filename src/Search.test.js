import React from 'react'
import renderer from 'react-test-renderer'
import SearchContainer from './Search'
import { posts } from './utils/SampleData'
import rootReducer from './reducers'
import { MemoryRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { normalize } from 'normalizr'
import { arrayOfPosts } from './actions/schema'
import * as types from './actions/types'

describe('<SingleContainer />', () => {
  const { entities, result } = normalize(posts, arrayOfPosts)
  const pageNumber = 1 // the default pageNumber is one if `match.params.pageNumber` is falsey
  const preloadedState = {
    postsById: entities.post,
    [types.SEARCH_QUERY]: { idsByPage: { [pageNumber]: result } }
  }
  const store = createStore(rootReducer, preloadedState)
  store.dispatch = () => {}

  it('should render without errors', () => {
    const component = renderer.create(
      <MemoryRouter initialEntries={[{ pathname: '/search' }]}>
        <Provider store={store}>
          <Route path="/search" component={SearchContainer} />
        </Provider>
      </MemoryRouter>
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
