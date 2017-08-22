import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Decrypter from 'decrypter/Decrypter'
import Navbar from 'styled/Navbar'
import globalStyles from 'styled/global'
import Tools from 'styled/Tools'
import HowToUse from 'styled/HowToUse'

const App = () =>
  <div>
    <globalStyles />
    <Navbar />
    <Switch>
      <Route path="/tools" component={Tools} />
      <Route path="/" component={HowToUse} />
      <Redirect exact from="/" to="/" />
    </Switch>
  </div>

export default App
