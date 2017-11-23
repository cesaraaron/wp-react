import React from 'react'
import { Route } from 'react-router-dom'
import Posts from './Posts'
import Single from './Single'

const App = () => (
  <div>
    <Route exact path="/" component={Posts} />
    <Route path="/:slug" component={Single} />
  </div>
)

export default App
