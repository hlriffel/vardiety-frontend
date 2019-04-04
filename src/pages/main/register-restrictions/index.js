import React, { Component } from 'react';

import Select from 'react-select';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import api from '../../../services/api';

export default class RegisterRestrictions extends Component {
    state = {
        components: [],
        loadingComponents: true,
        selectedComponents: []
    }

    fetchComponents = () => {
        api.get('/component').then(response => {
            this.setState({
                components: [
                    ...response.data.map(c => {
                        return {
                            value: c.id,
                            label: c.nm_component
                        }
                    })
                ],
                loadingComponents: false
            });
        });
    }

    componentDidMount() {
        this.fetchComponents();
    }

    onChangeList = values => {
        this.setState({
            selectedComponents: [
                ...values.map(v => {
                    return {
                        id: v.value
                    }
                })
            ]
        });
    }

    saveList = (e) => {
        console.log(e);
        function exibe(item){
            console.log(item)
        }
        e.forEach(exibe)
    }

    render() {
        return (
            <div id="register-restrictions" className="mt-3">
                <Container>
                    <Row className="d-flex justify-content-center">
                        <Col md={8}>
                            <h1>Registro de Restrições</h1>

                            <div className="mt-4">
                                <Form>
                                    <Form.Group>
                                        <Select
                                            isMulti
                                            isSearchable
                                            isLoading={this.state.loadingComponents}
                                            closeMenuOnSelect={false}
                                            options={this.state.components}
                                            onChange={this.onChangeList}
                                            valueKey="id"
                                            labelKey="name"
                                            placeholder="Restrição" />
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mt-3 d-flex justify-content-center">
                        <Col md={8} className="d-flex justify-content-end">
                            <Button variant="primary" onClick={this.saveList}>
                                Salvar
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
