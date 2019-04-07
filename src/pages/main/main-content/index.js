import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import InvitePatient from '../invite-patient';
import PatientList from '../patient-list';
import InitialDiet from '../initial-diet';
import GenerateCalendar from '../generate-calendar';
import ViewCalendar from '../view-calendar';
import ShoppingChecklist from '../shopping-checklist';
import RegisterRestrictions from '../register-restrictions';
import RegisterComponents from '../register-components';
import RegisterNutrients from '../register-nutrients';

const MainContent = () => (
  <Container className="p-5">
    <Row>
      <Col>
        <BrowserRouter>
          <Switch>
            <Route path="/main/invite-patient" component={InvitePatient} />
            <Route path="/main/patient-list" component={PatientList} />
            <Route path="/main/initial-diet" component={InitialDiet} />
            <Route path="/main/generate-calendar" component={GenerateCalendar} />
            <Route path="/main/view-calendar" component={ViewCalendar} />
            <Route path="/main/shopping-checklist" component={ShoppingChecklist} />
            <Route path="/main/register-restrictions" component={RegisterRestrictions} />
            <Route path="/main/register-components" component={RegisterComponents} />
            <Route path="/main/register-nutrients" component={RegisterNutrients} />
          </Switch>
        </BrowserRouter>
      </Col>
    </Row>
  </Container>
);

export default MainContent;
