import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import api from '../../services/api';

export default class InvitePatient extends Component {
    state = {
        email: ''
    }
    emailChange = event => {
        this.setState({
            email: event.target.value
        });
    }

    render() {
        return (
            <div id="invitePatient">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="5" className="m-5 p-5 bg-light border rounded">
                            <div id="invitePatient-title" className="pt-2 pb-2 text-center">
                                <h2>Convidar Paciente</h2>
                            </div>
                            <Form onSubmit={this.submit}>
                                <Form.Group>
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control type="text" required value={this.state.email} onChange={this.emailChange} />
                                </Form.Group>
                                <Button type="submit" variant="primary" block>
                                    Salvar
                            </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }

}