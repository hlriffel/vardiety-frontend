import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import api from '../../../../services/api';
import userService from '../../../../services/user.service';

const mapStateToProps = state => {
  return {
    meals: state.initialDiet.meals
  }
};

class Periods extends Component {
  state = {
    period: null,
    weekDays: null
  }

  periodOptions = [
    { value: 'S', label: 'Semanal' },
    { value: 'M', label: 'Mensal' }
  ]

  weekDayOptions = [
    { value: 1, label: 'Segunda-feira' },
    { value: 2, label: 'Terça-feira' },
    { value: 3, label: 'Quarta-feira' },
    { value: 4, label: 'Quinta-feira' },
    { value: 5, label: 'Sexta-feira' },
    { value: 6, label: 'Sábado' },
    { value: 7, label: 'Domingo' }
  ]

  handlePeriodChange = event => {
    this.setState({
      period: event.value
    });
  }

  handleWeekDaysChange = values => {
    this.setState({
      weekDays: values
    });
  }

  handleGenerateCalendar = () => {
    const data = {
      nutritionistId: userService.id,
      patientId: this.props.patientId,
      meals: this.props.meals,
      periods: {
        period: this.state.period,
        weekDays: [
          ...this.state.weekDays.map(w => w.value)
        ]
      }
    };

    api.post('/initial-diet/create', data);
  }

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
                    name="period"
                    placeholder="Período"
                    options={this.periodOptions}
                    onChange={this.handlePeriodChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Dias da semana</Form.Label>
                  <Select
                    isMulti
                    closeMenuOnSelect={false}
                    name="weekDays"
                    placeholder="Dias da semana"
                    options={this.weekDayOptions}
                    onChange={this.handleWeekDaysChange} />
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <Row className="mt-5 d-flex justify-content-center">
            <Col md={8} className="d-flex justify-content-end">
              <Button
                variant="primary"
                onClick={this.handleGenerateCalendar}>
                Gerar calendário
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Periods);
