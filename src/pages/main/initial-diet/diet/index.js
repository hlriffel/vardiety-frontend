import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';

import Meal from '../../../../components/meal';

export default class Diet extends Component {
  state = {
    meals: [
      {
        name: 'Café',
        items: [
          {
            id: 1,
            description: 'Polenta',
            amount: 300
          },
          {
            id: 2,
            description: 'Carne',
            amount: 257
          },
          {
            id: 3,
            description: 'Brócolis',
            amount: 563
          }
        ]
      },
      {
        name: 'Almoço',
        items: [
          {
            id: 8,
            description: 'Arroz',
            amount: 300
          },
          {
            id: 13,
            description: 'Frango',
            amount: 257
          },
          {
            id: 6,
            description: 'Alface',
            amount: 563
          }
        ]
      },
      {
        name: 'Janta',
        items: [
          {
            id: 57,
            description: 'Lasanha',
            amount: 300
          },
          {
            id: 14,
            description: 'Bisteca',
            amount: 257
          },
          {
            id: 20,
            description: 'Cenoura',
            amount: 563
          }
        ]
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

  render() {
    return (
      <div id="initial-diet-diet" className="mt-5">
        <Container>
          {
            this.state.meals.map((meal, index) => (
              <Meal
                key={index}
                meal={meal}
                mealIndex={index}
                onChangeMeal={this.handleMealChange} />
            ))
          }
        </Container>
      </div>
    )
  }
}
