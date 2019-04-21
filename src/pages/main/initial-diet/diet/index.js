import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Meal } from '../../../../components/meal';

import {
  addMeal,
  changeMeal,
  removeMeal,
  addMealItem,
  changeMealItem,
  removeMealItem
} from '../../../../redux/actions/initial-diet';

const mapStateToProps = state => {
  return {
    meals: state.initialDiet.meals
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addMeal: payload => dispatch(addMeal(payload)),
    changeMeal: payload => dispatch(changeMeal(payload)),
    removeMeal: payload => dispatch(removeMeal(payload)),
    addMealItem: payload => dispatch(addMealItem(payload)),
    changeMealItem: payload => dispatch(changeMealItem(payload)),
    removeMealItem: payload => dispatch(removeMealItem(payload))
  }
};

class Diet extends Component {

  handleMealAddition = index => {
    const internalId = Math.max(...this.props.meals.map(m => m.internalId));
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
    const mealIndex = index === undefined ? 0 : index + 1;

    this.props.addMeal({ index: mealIndex, item: newMeal });
  }

  handleMealChanging = payload => {
    this.props.changeMeal(payload);
  }

  handleMealRemoval = payload => {
    this.props.removeMeal(payload);
  }

  handleMealItemAddition = payload => {
    this.props.addMealItem(payload);
  }

  handleMealItemChanging = payload => {
    this.props.changeMealItem(payload);
  }

  handleMealItemRemoval = payload => {
    this.props.removeMealItem(payload);
  }

  handleNextClick = () => {
    this.props.history.push(`/main/initial-diet/${this.props.patientId}/periods`);
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
      <div id="initial-diet-diet" className="mt-3">
        <Container>
          {
            !this.props.meals.length &&
            this.renderAddMealButton()
          }

          {
            this.props.meals.map((meal, index) => (
              <div key={meal.internalId}>
                <Meal
                  meal={meal}
                  mealIndex={index}
                  onChangeMeal={this.handleMealChanging}
                  onRemoveMeal={this.handleMealRemoval}
                  onAddMealItem={this.handleMealItemAddition}
                  onChangeMealItem={this.handleMealItemChanging}
                  onRemoveMealItem={this.handleMealItemRemoval} />

                {
                  this.renderAddMealButton(index)
                }
              </div>
            ))
          }

          <Row className="mt-5 d-flex justify-content-center">
            <Col md={8} className="d-flex justify-content-end">
              <Button
                variant="primary"
                onClick={this.handleNextClick}>
                Prosseguir
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Diet);
