import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from './utils/configureStore'
import { getEndpoint } from './actions'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import packageJSON from '../package'

const store = configureStore()
store.dispatch(
  getEndpoint({ location: window.location, homepage: packageJSON.homepage })
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
