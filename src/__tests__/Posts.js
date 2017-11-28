import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import PostsContainer, { Post } from '../Posts'
import { posts } from '../data/SampleData'
import { createStore } from 'redux'
import rootReducer from '../reducers'
import { Provider } from 'react-redux'
import { normalize } from 'normalizr'
import { arrayOfPosts } from '../sagas/schema'
import { types } from '../actions'

it('should render a post', () => {
  const component = renderer.create(
    <MemoryRouter>
      <Post {...posts[0]} />
    </MemoryRouter>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

describe('<PostsContainer />', () => {
  const store = createStore(rootReducer)
  const rawDispatch = store.dispatch
  const response = normalize(posts, arrayOfPosts)

  store.dispatch = action => {
    switch (action.type) {
      case types.FETCH_POSTS_REQUEST:
        return rawDispatch({ type: types.FETCH_POSTS_SUCCESS, response })
      default:
        return rawDispatch(action)
    }
  }

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
