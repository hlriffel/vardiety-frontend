import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class RegisterComponents extends Component {

    render() {
        return (
            <div id="register-components">

                <h1>Registrar Componentes</h1>

                <Row className="p-3 d-flex justify-content-center">
                    <Col md={8}>
                        <Form>
                            <Form.Row>
                                <label for="desc_component">Descrição:</label>
                                <Form.Control
                                    inline
                                    type="text"
                                    name="desc_component"
                                    required />
                            </Form.Row>

                            <Form.Group>
                                <label for="grupo_componente">Grupo:</label>
                                <Form.Control
                                    inline
                                    type="text"
                                    name="grupo_componente"
                                    required />
                            </Form.Group>

                            <br />

                            <Form.Check
                                required
                                type="checkbox"
                                name="situation_comp"
                                label="Ativo" />

                            <br />

                            <Button
                                variant="primary">
                                Cadastrar
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
