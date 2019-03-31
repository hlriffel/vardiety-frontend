import React, { Component } from 'react';
import Select from 'react-select';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default class Periods extends Component {
  state = {

  }

  periodOptions = [
    { value: 'S', label: 'Semanal' },
    { value: 'M', label: 'Mensal' }
  ]

  weekDayOptions = [
    { value: 'SEG', label: 'Segunda-feira' },
    { value: 'TER', label: 'Terça-feira' },
    { value: 'QUA', label: 'Quarta-feira' },
    { value: 'QUI', label: 'Quinta-feira' },
    { value: 'SEX', label: 'Sexta-feira' },
    { value: 'SAB', label: 'Sábado' },
    { value: 'DOM', label: 'Domingo' }
  ]

  render() {
    return (
      <div id="initial-diet-periods" className="mt-3">
        <Container>
          <Row className="d-flex justify-content-center">
            <Col md={8}>
              <Form>
                <Form.Group>
                  <Form.Label>Período</Form.Label>
                  <Select
                    isClearable
                    options={this.periodOptions}
                    placeholder="Período" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Dias da semana</Form.Label>
                  <Select
                    isMulti
                    options={this.weekDayOptions}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    placeholder="Dias da semana" />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
