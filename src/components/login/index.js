import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Login extends Component {
  state = {
    email: null,
    password: null
  }

  emailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  passwordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  submit = event => {
    console.log(event, this.state);

    return false;
  }

  render() {
    return (
      <div id="login">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="5" className="m-5 p-5 bg-light border rounded">
              <div id="login-title" className="pt-2 pb-2 text-center">
                <h2>Login</h2>
              </div>

              <Form onSubmit={this.submit}>
                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control type="email" required/>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" required/>
                </Form.Group>

                <Button type="submit" variant="primary" block>
                  Entrar
                </Button>
              </Form>

              <div id="login-actions" className="d-flex justify-content-between mt-2">
                <Link to="/register">Cadastrar-se</Link>
                <div>ou</div>
                <div>Login com conta Google</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
