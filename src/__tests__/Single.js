import React from 'react'
import renderer from 'react-test-renderer'
import SingleContainer, { Single } from '../Single'
import { posts } from '../data/SampleData'
import rootReducer from '../reducers'
import { MemoryRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { normalize } from 'normalizr'
import { arrayOfPosts } from '../sagas/schema'
import { types } from '../actions/index'

it('should render a post', () => {
  const component = renderer.create(<Single {...posts[0]} />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

describe('<PostsContainer />', () => {
  const store = createStore(rootReducer)
  const rawDispatch = store.dispatch
  const response = normalize(posts, arrayOfPosts)

  store.dispatch = action => {
    switch (action.type) {
      case types.FETCH_SINGLE_REQUEST:
        return rawDispatch({ type: types.FETCH_SINGLE_SUCCESS, response })
      default:
        return rawDispatch(action)
    }
  }

  const component = renderer.create(
    <MemoryRouter initialEntries={['/hello-world']} initialIndex={0}>
      <Provider store={store}>
        <Route path="/:slug" component={SingleContainer} />
      </Provider>
    </MemoryRouter>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
