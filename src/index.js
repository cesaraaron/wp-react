import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import app from './reducers'
import { getEndpoint } from './actions'

const store = createStore(app)
store.dispatch(getEndpoint())

if (process.env.NODE_ENV !== 'production') {
  const div = document.createElement('div')
  div.setAttribute('id', 'root')
  document.body.insertBefore(div, document.body.firstChild)
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
