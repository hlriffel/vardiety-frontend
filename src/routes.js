import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/login';
import Register from './components/register';
import ChecklistShopping from './components/main/checklistShopping/ChecklistShopping';
import GenerateCalendar from './components/main/generateCalendar/generateCalendar';
import InitialDiet from './components/main/initialDiet/InitialDiet';
import InvitePatient from './components/main/invitePatient/InvitePatient';
import ListPatient from './components/main/listPatient/ListPatient';
import RegisterComponents from './components/main/registerComponents/RegisterComponents';
import RegisterRestrictions from './components/main/registerRestrictions/RegisterRestrictions';
import VisualizeCalendar from './components/main/visualizeCalendar/VisualizeCalendar';

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
