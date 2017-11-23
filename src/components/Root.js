import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from '../App'
import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { getEndpoint } from '../actions'
import createSagaMiddleware from 'redux-saga'
import sagas from '../sagas'
import { createLogger } from 'redux-logger'

const logger = createLogger()
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger))

sagaMiddleware.run(sagas)

store.dispatch(getEndpoint(window.location))

const Root = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

export default Root

if (module.hot) {
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers/index')
    store.replaceReducer(nextRootReducer)
  })
  module.hot.accept('../sagas', () => {
    sagaMiddleware.run(sagas)
  })
}
