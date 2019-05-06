import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav';
import FormControl from 'react-bootstrap/FormControl'

import { LinkContainer } from 'react-router-bootstrap';

export default class Header extends Component {

  render() {
    return (
      <header className="fixed-top">
        <Navbar bg="primary" variant="dark">
          <LinkContainer to="/main">
            <Navbar.Brand>Vardiety</Navbar.Brand>
          </LinkContainer>
          <Nav className="mr-auto">
            <LinkContainer to="/main">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Cadastros" bg="primary">
              <NavDropdown.Item>
                <LinkContainer to="/main/register-restrictions">
                 <Nav.Link><font color="black">Restrições</font></Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
              <LinkContainer to="/main/register-components">
                <Nav.Link><font color="black">Componentes</font></Nav.Link>
              </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
              <LinkContainer to="/main/register-nutrients">
                <Nav.Link><font color="black">Nutrientes X Componentes</font></Nav.Link>
              </LinkContainer>  
              </NavDropdown.Item>
            </NavDropdown>
            { /* Controlar se o usuário logado é nutricionista. Se não for, esconde esse cara */ }
            <LinkContainer to="/main/patient-list">
              <Nav.Link>Lista de pacientes</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/main/nutritionist-list">
              <Nav.Link>Lista de nutricionistas</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/main/about">
              <Nav.Link>Sobre?</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Pesquisa" className="mr-sm-2" />
            <Button variant="outline-light">Buscar</Button>
          </Form>
        </Navbar>
      </header>
    );
  }
}