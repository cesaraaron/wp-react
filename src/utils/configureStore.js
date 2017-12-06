import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

export default () => {
  const logger = createLogger()

  const store = createStore(rootReducer, applyMiddleware(thunk, logger))

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
