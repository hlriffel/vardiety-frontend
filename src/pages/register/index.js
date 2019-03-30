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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
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
                  <Form.Control type="text" name="name" required value={this.state.name} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control type="email" name="email" required value={this.state.email} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" name="password" required value={this.state.password} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Confirmação de senha</Form.Label>
                  <Form.Control type="password" name="passwordConf" required value={this.state.passwordConf} onChange={this.handleChange} />
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
                    name="userType"
                    label="Nutricionista"
                    value="NUT"
                    onClick={this.handleChange} />

                  <Form.Check
                    custom
                    required
                    type="radio"
                    id="ut2"
                    name="userType"
                    label="Paciente"
                    value="PAC"
                    onClick={this.handleChange} />
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