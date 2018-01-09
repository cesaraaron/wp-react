import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Posts from './Home'
import Single from './Single'
import Category from './Category'
import Search from './Search'

const App = () => (
  <div>
    <Route exact path="/" component={Posts} />
    <Route path="/page/:pageNumber" component={Posts} />
    <Route path="/category/:slug" component={Category} />
    <Switch>
      <Route path="/search" component={Search} />
      <Route exact path="/:slug" component={Single} />
    </Switch>
  </div>
)

export default App
