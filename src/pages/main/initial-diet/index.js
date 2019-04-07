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
          <Nav fill variant="tabs" defaultActiveKey="/main/initial-diet/diet">
            <Nav.Item>
              <LinkContainer to="/main/initial-diet/diet">
                <Nav.Link>Dieta</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/main/initial-diet/periods">
                <Nav.Link>Períodos</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>

          <Route path="/main/initial-diet/diet" component={Diet} />
          <Route path="/main/initial-diet/periods" component={Periods} />
        </div>
      </div>
    )
  }
}
