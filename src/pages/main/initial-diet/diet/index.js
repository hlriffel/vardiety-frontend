import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Meal from '../../../../components/meal';

export default class Diet extends Component {
  state = {
    meals: [
      {
        id: null,
        name: 'Café',
        items: [
          {
            id: null,
            description: '',
            amount: ''
          }
        ],
        internalId: 1
      },
      {
        id: null,
        name: 'Almoço',
        items: [
          {
            id: null,
            description: '',
            amount: ''
          }
        ],
        internalId: 2
      },
      {
        id: null,
        name: 'Janta',
        items: [
          {
            id: null,
            description: 'Lasanha',
            amount: ''
          }
        ],
        internalId: 3
      }
    ]
  };

  handleMealChange = (meal, index) => {
    const state = {
      ...this.state
    };

    state.meals[index] = meal;

    this.setState(state);
  }

  handleMealRemoval = mealIndex => {
    const state = {
      ...this.state
    };

    state.meals.splice(mealIndex, 1);

    this.setState(state);
  }

  handleMealAddition = index => {
    const state = {
      ...this.state
    };
    const internalId = Math.max(...state.meals.map(m => m.internalId));
    const newMeal = {
      id: null,
      name: 'Nova refeição',
      items: [
        {
          id: null,
          description: '',
          amount: ''
        }
      ],
      internalId: internalId + 1
    };

    state.meals.splice(index + 1, 0, newMeal);

    this.setState(state);
  }

  renderAddMealButton = index => (
    <Row className="d-flex justify-content-center">
      <Col md={5} className="m-2 d-flex flex-column">
        <Button
          variant="primary"
          onClick={() => { this.handleMealAddition(index) }} >
          <span className="oi oi-plus"></span>
        </Button>
      </Col>
    </Row>
  )

  render() {
    return (
      <div id="initial-diet-diet" className="mt-5">
        <Container>
          {
            !this.state.meals.length &&
            this.renderAddMealButton()
          }

          {
            this.state.meals.map((meal, index) => (
              <div key={meal.internalId}>
                <Meal
                  meal={meal}
                  mealIndex={index}
                  onChangeMeal={this.handleMealChange}
                  onRemoveMeal={this.handleMealRemoval} />

                {
                  this.renderAddMealButton(index)
                }
              </div>
            ))
          }
        </Container>
      </div>
    )
  }
}
