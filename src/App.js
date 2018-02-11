import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Posts from './Home'
import Single from './Single'
import Category from './Category'
import Search from './Search'
import Author from './Author'
import Page from './Page'

const App = () => (
  <div>
    <Route exact path="/" component={Posts} />
    <Route path="/p/:pageNumber" component={Posts} />
    <Route path="/category/:slug" component={Category} />
    <Switch>
      <Route path="/search" component={Search} />
      <Route exact path="/:slug" component={Single} />
    </Switch>
    <Route path="/author/:authorSlug" component={Author} />
    <Route path="/page/:slug" component={Page} />
  </div>
)

export default App
