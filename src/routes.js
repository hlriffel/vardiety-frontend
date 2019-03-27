import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/login';
import Register from './components/register';
import ChecklistShopping from './components/main/checklistShopping';
import GenerateCalendar from './components/main/generateCalendar';
import InitialDiet from './components/main/initialDiet';
import InvitePatient from './components/main/invitePatient';
import ListPatient from './components/main/listPatients';
import RegisterComponents from './components/main/registerComponents';
import RegisterRestrictions from './components/main/registerRestrictions';
import VisualizeCalendar from './components/main/viewCalendar';

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
