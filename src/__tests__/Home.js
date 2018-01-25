import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import PostsContainer from '../Home'
import { posts } from '../utils/SampleData'
import { createStore } from 'redux'
import rootReducer from '../reducers'
import { Provider } from 'react-redux'
import { normalize } from 'normalizr'
import { arrayOfPosts } from '../actions/schema'
import * as types from '../actions/types'

describe('<HomeContainer />', () => {
  const { entities, result } = normalize(posts, arrayOfPosts)
  const pageNumber = 1 // the default pageNumber is one if `match.params.pageNumber` is falsey
  const preloadedState = {
    postsById: entities.post,
    [types.POSTS]: { idsByPage: { [pageNumber]: result } }
  }
  const store = createStore(rootReducer, preloadedState)
  store.dispatch = () => {}

  it('should render without errors', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <PostsContainer />
        </Provider>
      </MemoryRouter>
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
