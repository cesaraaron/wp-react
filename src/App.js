import React from 'react'
import { Route } from 'react-router-dom'
import Posts from './Home'
import Single from './Single'
import Category from './Category'

const App = () => (
  <div>
    <Route exact path="/" component={Posts} />
    <Route path="/page/:pageNumber" component={Posts} />
    <Route exact path="/:slug" component={Single} />
    <Route path="/category/:slug" component={Category} />
  </div>
)

export default App
