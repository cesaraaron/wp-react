import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from './utils/configureStore'
import { getEndpoint } from './actions'
import './index.css'
// import registerServiceWorker from './registerServiceWorker'

const render = (Component, store) => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Component />
      </Router>
    </Provider>,
    document.getElementById('root')
  )
}

const store = configureStore()

store.dispatch(getEndpoint(window.location))

render(App, store)
// registerServiceWorker()
