import React from 'react'
import { Route } from 'react-router-dom'
import Posts from './Home'
import Single from './Single'

const App = () => (
  <div>
    <Route exact path="/" component={Posts} />
    <Route path="/page/:pageNumber" component={Posts} />
    <Route exact path="/:slug" component={Single} />
  </div>
)

export default App
