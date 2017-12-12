import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

export default (initialState, addLogger = true) => {
  const middlewares = [thunk]

  if (addLogger) {
    middlewares.push(createLogger())
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
