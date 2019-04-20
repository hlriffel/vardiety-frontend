import React, { Component } from 'react';

import Select from 'react-select';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import api from '../../../services/api';

export default class RegisterNutrients extends Component {

    state = {
        nutrients: [],
        loadingNutrient: true,
        selectedGroup: [],
        components: [],
        loadingComponents: true,
        qtNutrient: 0
    }

    fetchComponents = () => {
        api.get('/nutrient').then(response => {
            this.setState({
                nutrients: [
                    ...response.data.map(c => {
                        return {
                            value: c.id,
                            label: c.ds_nutrient
                        }
                    })
                ],
                loadingNutrient: false
            });
        });

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
            componentId: this.state.loadingNutrient.id,
            nutrientId: this.state.categories.id,
            nutrientQuant: this.state.qtNutrient
        }

        api.post('/nutrient-component/create', data);
    }

    render() {
        return (
            <div id="register-components" className="mt-3">
                <Container>

                    <Row className="d-flex justify-content-center">
                        <Col md={8}>
                            <h1>Registro de Nutrientes</h1>

                            <div className="mt-4">
                                <Form>
                                    <label for="id_component">Componente:</label>
                                    <Form.Group>
                                        <Select
                                            isMulti
                                            isSearchable
                                            isLoading={this.state.loadingComponents}
                                            closeMenuOnSelect={false}
                                            options={this.state.components}
                                            onChange={this.onChangeList}
                                            id="id_component"
                                            name="id_component"
                                            valueKey="id"
                                            labelKey="name"
                                            placeholder="Informe o componente" />
                                    </Form.Group>
                                </Form>
                            </div>

                            <div className="mt-4">
                                <Form>
                                    <label for="id_nutrient">Nutriente:</label>
                                    <Form.Group>
                                        <Select
                                            isMulti
                                            isSearchable
                                            isLoading={this.state.loadingNutrient}
                                            closeMenuOnSelect={false}
                                            options={this.state.nutrients}
                                            onChange={this.onChangeList}
                                            id="id_nutrient"
                                            name="id_nutrient"
                                            valueKey="id"
                                            labelKey="nm_nutrient"
                                            placeholder="Informe o nutriente" />
                                    </Form.Group>
                                </Form>

                                <Form>
                                    <label for="qt_nutrient">Descrição:</label>
                                    <Form.Control
                                        inline
                                        type="text-number"
                                        id="qt_nutrient"
                                        name="qt_nutrient"
                                        value={this.state.qtNutrient}
                                        onChange={this.handleChange}
                                        placeholder="Quantidade do nutriente"
                                        required />
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
