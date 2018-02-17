import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from './utils/configureStore'
import { getEndpoint } from './actions'

if (process.env.NODE_ENV !== 'production') {
  const div = document.createElement('div')
  div.setAttribute('id', 'root')
  document.body.insertBefore(div, document.body.firstChild)
}

const render = (Component, store) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

const store = configureStore()

store.dispatch(getEndpoint(window.location))

render(App, store)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
