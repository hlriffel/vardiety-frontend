import React, { Component } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { Meal } from '../../../../components/meal';

export class CalendarDay extends Component {
  render() {
    return (
      <div id="calendar-day">
        <Modal
          show={this.props.show}
          size="lg"
          centered
          onHide={this.props.onClose} >
          <Modal.Header closeButton>
            <Modal.Title>
              { this.props.title }
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={{'maxHeight': 'calc(90vh - 230px)', 'overflowY': 'auto'}} >
            {
              this.props.meals.map((meal, index) => (
                <div key={meal.id}>
                  <Meal
                    meal={meal}
                    mealIndex={index} 
                    iconUpdate="true"/>
                </div>
              ))
            }
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={this.props.onClose}>Fechar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
