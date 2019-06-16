import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { GoogleLogin } from 'react-google-login';

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

    const login = {
      email: this.state.email,
      password: this.state.password
    };

    api.post('/user/login', login).then(res => {
      this.loginSuccessful(res.data);
    }).catch(err => {
      if (err.response.status === 404) {
        this.setState({
          wrongCombination: true
        });
      }
    });
  }

  loginSuccessful = userData => {
    const { history } = this.props;
    this.setState({
      wrongCombination: false
    });

    userService.setData(userData);
    localStorage.setItem('userData', JSON.stringify(userService.getData()));
    history.push('/main');
  }

  handleGoogleSuccess = info => {
    const basicProfile = info.getBasicProfile();
    const data = {
      email: basicProfile.getEmail(),
      name: basicProfile.getName()
    };

    api.post('/user/google-login', data).then(res => {
      this.loginSuccessful(res.data);
    });
  }

  handleGoogleFailure = info => {
    console.log(info);
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

              <div id="login-actions">
                <div className="d-flex justify-content-center mt-2 mb-2">
                  <Link to="/register">Cadastrar-se</Link>
                </div>

                <div className="d-flex justify-content-center mt-2 mb-2">
                  OU
                </div>
                
                <div className="d-flex justify-content-center mt-2 mb-2">
                  <GoogleLogin
                    clientId="790163224963-2urjhk1jn9hj7rk3eica3jva6d67ne35.apps.googleusercontent.com"
                    buttonText="Entrar com uma conta Google"
                    onSuccess={this.handleGoogleSuccess}
                    onFailure={this.handleGoogleFailure} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
