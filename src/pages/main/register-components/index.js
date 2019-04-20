import React, { Component } from 'react';

import Select from 'react-select';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import api from '../../../services/api';

export default class RegisterComponents extends Component {

    state = {
        categories: [],
        loadingCategories: true,
        nmComponent: '',
        selectedGroup: []
    }

    fetchComponents = () => {
        api.get('/component-category').then(response => {
            this.setState({
                categories: [
                    ...response.data.map(c => {
                        return {
                            value: c.id,
                            label: c.nm_category
                        }
                    })
                ],
                loadingCategories: false
            });
        });
    }

    componentDidMount() {
        this.fetchComponents();
    }

    onChangeList = values => {
        this.setState({
            selectedGroup: [
                ...values.map(v => {
                    return {
                        id: v.value
                    }
                })
            ]
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSave = () => {

        const data = {
            componentName: this.state.nmComponent,
            categoryId: this.state.categories.id
        }

        api.post('/component/create', data);
    }

    render() {
        return (
            <div id="register-components" className="mt-3">
                <Container>

                    <Row className="d-flex justify-content-center">
                        <Col md={8}>
                            <h1>Registro de Componentes</h1>

                            <div className="mt-4">
                                <Form.Group>
                                    <Form.Label>Descrição:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="nm_component"
                                        name="nm_component"
                                        onChange={this.handleChange}
                                        placeholder="Insira o nome do componente" />
                                </Form.Group>
                            </div>

                            <div className="mt-4">
                                <Form>
                                    <label for="id_category">Categoria:</label>
                                    <Form.Group>
                                        <Select
                                            isMulti
                                            isSearchable
                                            isLoading={this.state.loadingCategories}
                                            closeMenuOnSelect={false}
                                            options={this.state.categories}
                                            onChange={this.onChangeList}
                                            id="id_category"
                                            name="id_category"
                                            valueKey="id"
                                            labelKey="nm_category"
                                            placeholder="Informe a categoria do componente" />
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mt-3 d-flex justify-content-center">
                        <Col md={8} className="d-flex justify-content-end">
                            <Button variant="primary" onClick={this.handleSave}>
                                Salvar
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
