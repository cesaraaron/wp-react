import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import PostsContainer, { Post } from '../Home'
import { posts } from '../data/SampleData'
import { createStore } from 'redux'
import rootReducer from '../reducers'
import { Provider } from 'react-redux'
import { normalize } from 'normalizr'
import { arrayOfPosts } from '../actions/schema'
import * as types from '../actions/types'

it('should render a post', () => {
  const component = renderer.create(
    <MemoryRouter>
      <Post {...posts[0]} />
    </MemoryRouter>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

describe('<HomeContainer />', () => {
  const store = createStore(rootReducer)
  const rawDispatch = store.dispatch
  const response = normalize(posts, arrayOfPosts)
  response._paging = { totalPages: 0 }

  store.dispatch = action => {
    if (typeof action === 'function') {
      action(store.dispatch, store.getState)
    } else {
      return action.type === types.FETCH_POSTS_REQUEST
        ? rawDispatch({
            type: types.FETCH_POSTS_SUCCESS,
            response,
            pageNumber: 1
          })
        : null
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
