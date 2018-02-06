import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import renderer from 'react-test-renderer'
import AuthorContainer from './Author'
import { posts, users } from './utils/SampleData'
import { createStore } from 'redux'
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import { normalize } from 'normalizr'
import { arrayOfPosts } from './actions/schema'
import * as types from './actions/types'

describe('<AuthorContainer />', () => {
  const { entities: postsEntities, result: postsResult } = normalize(
    posts,
    arrayOfPosts
  )
  const { entities: userEntities } = normalize(users, arrayOfPosts)
  const pageNumber = 1 // the default pageNumber is one if `match.params.pageNumber` is falsey
  const preloadedState = {
    postsById: postsEntities.post,
    usersById: userEntities.post,
    [types.POSTS_BY_AUTHOR]: { idsByPage: { [pageNumber]: postsResult } }
  }
  const store = createStore(rootReducer, preloadedState)
  store.dispatch = () => {}

  it('should render without errors', () => {
    const component = renderer.create(
      <MemoryRouter initialEntries={[{ pathname: '/author/7704wpczar' }]}>
        <Provider store={store}>
          <Route path="/author/:authorSlug" component={AuthorContainer} />
        </Provider>
      </MemoryRouter>
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
