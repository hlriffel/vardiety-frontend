import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Route } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';

import Diet from './diet';
import Periods from './periods';

export default class InitialDiet extends Component {

  render() {
    return (
      <div id="initial-diet">
        <h1>Dieta inicial</h1>

        <div className="mt-3">
          <Nav fill variant="tabs" defaultActiveKey={`/main/initial-diet/${this.props.match.params.patientId}/diet`}>
            <Nav.Item>
              <LinkContainer to={`/main/initial-diet/${this.props.match.params.patientId}/diet`}>
                <Nav.Link>Dieta</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to={`/main/initial-diet/${this.props.match.params.patientId}/periods`}>
                <Nav.Link>Períodos</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>

          <Route
            path={`/main/initial-diet/${this.props.match.params.patientId}/diet`}
            render={props => <Diet {...props} patientId={this.props.match.params.patientId} /> } />
          <Route
            path={`/main/initial-diet/${this.props.match.params.patientId}/periods`}
            render={props => <Periods {...props} patientId={this.props.match.params.patientId} /> } />
        </div>
      </div>
    )
  }
}
