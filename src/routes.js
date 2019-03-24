import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/login';
import Register from './components/register';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
