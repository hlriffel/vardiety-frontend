import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import api from '../../../services/api';

export default class InvitePatient extends Component {
    state = {
        emailPatient: '',
        saveSucess: false
    }
    handleChange = event => {
        this.setState({
            [event.target.emailPatient]: event.target.value
        })
    }
    submit = event => {
        event.preventDefault();
        const { history } = this.props;

  

        api.get('/user').then(response => {

            const nutritionistPatient = {
                id_nutritionist: localStorage.getItem('id'),
                id_patient: ''
            };

            response.data.forEach(element => {
                if (element.ds_email === document.getElementById('emailPatient').value) {
                    nutritionistPatient.id_patient = element.id;

                }
            });

            api.post('/nutritionist-patient/create', nutritionistPatient).then(() => {
                history.push('/main/invite-patient');
       

            });
        });
    }

    render() {
        return (
            <div id="invitePatient">
                <Container>
                    <Row className="justify-content-md-center">

                        <Col md="5" className="m-5 p-5 bg-light border rounded">
                            <div id="invitePatient-title" className="pt-2 pb-2 text-center">
                                <h2>Cadastrar Paciente</h2>
                                <Form onSubmit={this.submit}>
                                    <Form.Group>
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control id="emailPatient" type="emailPatient" emailPatient="emailPatient" onChange={this.handleChange} />
                                    </Form.Group>
                                    <Button type="submit" variant="primary" block>
                                        Salvar
                                 </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
