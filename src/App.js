import React from 'react'
import { Route } from 'react-router-dom'
import Posts from './Posts'

const App = () => (
  <div>
    <Route exact path="/" component={Posts} />
  </div>
)

export default App
