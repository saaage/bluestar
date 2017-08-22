import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Decrypter from 'decrypter/Decrypter'
import Navbar from 'styled/Navbar'
import globalStyles from 'styled/global'
import Additional from 'components/Additional'
import HowTo from 'components/HowToUse'

const App = () =>
  <div>
    <globalStyles />
    <Navbar />
    <Switch>
      <Route path="/tools" component={Additional} />
      <Route path="/" component={HowTo} />
      <Redirect exact from="/" to="/" />
    </Switch>
  </div>

export default App
