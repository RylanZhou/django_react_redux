import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import { AlertProvider } from './AlertContext'

import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Register from './pages/register'

import Alert from './components/Alert'

import { loadUser } from './actions/auth'

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider>
          <Router>
            <Alert />
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </Router>
        </AlertProvider>
      </Provider>
    )
  }
}
