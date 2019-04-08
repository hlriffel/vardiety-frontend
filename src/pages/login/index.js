import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import api from '../../services/api';
import userService from '../../services/user.service';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    wrongCombination: false 
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submit = event => {
    event.preventDefault();
    const { history } = this.props;
    const login = {
      email: this.state.email,
      password: this.state.password
    };

    api.post('/user/login', login).then(res => {
      this.setState({
        wrongCombination: false
      });

      userService.setData(res.data);
      localStorage.setItem('userData', JSON.stringify(userService.getData()));
      history.push('/main');
    }).catch(err => {
      if (err.response.status === 404) {
        this.setState({
          wrongCombination: true
        });
      }
    });
  }

  render() {
    return (
      <div id="login">
        <Container>
          <Row className="justify-content-md-center">
            <Col lg="5" className="m-5 p-5 bg-light border rounded">
              <div id="login-title" className="pt-2 pb-2 text-center">
                <h2>Login</h2>
              </div>

              <Form onSubmit={this.submit}>
                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
                </Form.Group>

                {
                  this.state.wrongCombination &&
                    <Alert variant="danger">E-mail ou senha incorretos!</Alert>
                }

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
