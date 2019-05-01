import React from 'react';
import { Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import InvitePatient from '../invite-patient';
import PatientList from '../patient-list';
import InitialDiet from '../initial-diet';
import ViewCalendar from '../view-calendar';
import RegisterRestrictions from '../register-restrictions';
import RegisterComponents from '../register-components';
import RegisterNutrients from '../register-nutrients';

const MainContent = () => (
  <Container className="p-5">
    <Row>
      <Col>
        <Route path="/main/invite-patient" component={InvitePatient} />
        <Route path="/main/patient-list" component={PatientList} />
        <Route path="/main/initial-diet/:patientId" component={InitialDiet} />
        <Route path="/main/view-calendar/:nutritionistId/:patientId" component={ViewCalendar} />
        <Route path="/main/register-restrictions" component={RegisterRestrictions} />
        <Route path="/main/register-components" component={RegisterComponents} />
        <Route path="/main/register-nutrients" component={RegisterNutrients} />
      </Col>
    </Row>
  </Container>
);

export default MainContent;
