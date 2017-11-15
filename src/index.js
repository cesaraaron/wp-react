import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './components/Root'

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

render(Root)

if (module.hot) {
  module.hot.accept('./Root', () => {
    render(Root)
  })
}
