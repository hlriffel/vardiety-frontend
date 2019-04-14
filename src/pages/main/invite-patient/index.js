import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import api from '../../../services/api';
import userService from '../../../services/user.service';

export default class InvitePatient extends Component {
  state = {
    patientEmail: '',
    saveSucess: false
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  submit = event => {
    event.preventDefault();
    const { history } = this.props;
    const data = {
      nutritionistId: userService.id,
      patientEmail: this.state.patientEmail
    };

    api.post('/nutritionist-patient/create', data).then(() => {
      history.push('/main/patient-list');
    });
  }

  render() {
    return (
      <div id="invite-patient">
        <Container>
          <Row className="justify-content-center">

            <Col md="5" className="m-5 p-5 bg-light border rounded">
              <div className="pt-2 pb-2 text-center">
                <h2>Cadastrar Paciente</h2>

                <Form onSubmit={this.submit}>
                  <Form.Group>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                      type="email"
                      id="email-patient"
                      name="patientEmail"
                      value={this.state.patientEmail}
                      onChange={this.handleChange} />
                  </Form.Group>

                  <Button type="submit" variant="primary" block>
                    Salvar
                 </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
