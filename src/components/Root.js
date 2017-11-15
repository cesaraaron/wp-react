import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from '../App'
import app from '../reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { getEndpoint } from '../actions'

const store = createStore(app)
store.dispatch(getEndpoint(window.location))

const Root = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

export default Root
