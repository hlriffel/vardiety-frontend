import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';

const isUserLoggedIn = () => {
  return localStorage.getItem('userData') !== null;
}

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/main" render={() => (
        isUserLoggedIn() ? <Main /> : <Login />
      )} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
