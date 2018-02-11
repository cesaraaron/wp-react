import React from 'react'
import App from './App'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'

describe('<App />', () => {
  const store = createStore(rootReducer)
  store.dispatch = () => {}

  it('should render without crashing', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
