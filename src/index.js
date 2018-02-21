import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from './utils/configureStore'
import { getEndpoint } from './actions'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore()
store.dispatch(getEndpoint(window.location))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
