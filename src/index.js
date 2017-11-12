import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

if (process.env.NODE_ENV !== 'production') {
  const div = document.createElement('div')
  div.setAttribute('id', 'root')
  document.body.insertBefore(div, document.body.firstChild)
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
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
