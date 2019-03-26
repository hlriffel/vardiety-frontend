import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import api from '../../services/api';

export default class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConf: '',
    userType: '',
    passwordMismatch: false
  }

  nameChange = event => {
    this.setState({
      name: event.target.value
    });
  }

  emailChange = event => {
    this.setState({
      email: event.target.value
    });
  }

  passwordChange = event => {
    this.setState({
      password: event.target.value
    });
  }

  passwordConfChange = event => {
    this.setState({
      passwordConf: event.target.value
    });
  }

  userTypeChange = event => {
    this.setState({
      userType: event.target.value
    });
  }
  
  submit = event => {
    event.preventDefault();
    const { history } = this.props;

    if (this.state.password !== this.state.passwordConf) {
      this.setState({
        passwordMismatch: true
      });
    } else {
      this.setState({
        passwordMismatch: false
      });

      const user = {
        nm_person: this.state.name,
        ds_email: this.state.email,
        ds_password: this.state.password,
        cn_user_type: this.state.userType
      };

      api.post('/user/create', user).then(() => {
        history.push('/login');
      });
    }
  }

  render() {
    return (
      <div id="register">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="5" className="m-5 p-5 bg-light border rounded">
              <div id="register-title" className="pt-2 pb-2 text-center">
                <h2>Cadastro</h2>
              </div>

              <Form onSubmit={this.submit}>
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" required value={this.state.name} onChange={this.nameChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control type="email" required value={this.state.email} onChange={this.emailChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" required value={this.state.password} onChange={this.passwordChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Confirmação de senha</Form.Label>
                  <Form.Control type="password" required value={this.state.passwordConf} onChange={this.passwordConfChange} />
                </Form.Group>

                {
                  this.state.passwordMismatch &&
                    <Alert variant="danger">As senhas não coincidem!</Alert>
                }

                <Form.Group>
                  <Form.Check
                    custom
                    required
                    type="radio"
                    id="ut1"
                    name="user-type"
                    label="Nutricionista"
                    value="NUT"
                    onClick={this.userTypeChange} />

                  <Form.Check
                    custom
                    required
                    type="radio"
                    id="ut2"
                    name="user-type"
                    label="Paciente"
                    value="PAC"
                    onClick={this.userTypeChange} />
                </Form.Group>

                <Button type="submit" variant="primary" block>
                  Enviar
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}