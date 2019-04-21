import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import MealItem from './meal-item';

export class Meal extends Component {
  state = {
    isHoveringName: false,
    isEditingName: false
  }

  handleMealNameChange = event => {
    this.props.onChangeMeal && this.props.onChangeMeal({
      index: this.props.mealIndex,
      item: {
        ...this.props.meal,
        [event.target.name]: event.target.value
      }
    });
  }

  handleMealRemoval = () => {
    this.props.onRemoveMeal && this.props.onRemoveMeal({
      index: this.props.mealIndex
    });
  }

  handleItemAddition = () => {
    this.props.onAddMealItem && this.props.onAddMealItem({
      index: this.props.mealIndex,
      item: {
        id: null,
        description: '',
        amount: ''
      }
    });
  }

  handleMealNameEdit = () => {
    this.setState({
      isEditingName: true,
      isHoveringName: false
    }, () => {
      this.mealNameInput.focus();
      this.mealNameInput.select();
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      isEditingName: false,
      isHoveringName: false
    });
  }

  render() {
    return (
      <div>
        <Row className="p-3 d-flex justify-content-center">
          <Col lg={8}>
            <div
              id="meal-name"
              onMouseOver={() => { this.setState({ isHoveringName: true }) }}
              onMouseLeave={() => { this.setState({ isHoveringName: false }) }} >
              {
                !this.state.isEditingName &&
                <p
                  className="h5 d-inline-block">
                  {this.props.meal.name}
                </p>
              }

              {
                this.state.isHoveringName &&
                <div className="d-inline">
                  <span
                    style={{ cursor: 'pointer' }}
                    className="ml-3 oi oi-pencil"
                    onClick={this.handleMealNameEdit}>
                  </span>

                  <span
                    style={{ cursor: 'pointer' }}
                    className="ml-3 oi oi-x"
                    onClick={this.handleMealRemoval} >
                  </span>
                </div>
              }
            </div>

            {
              this.state.isEditingName &&
              <Form
                inline
                onSubmit={this.handleSubmit}
                ref={form => { this.mealNameForm = form }} >
                <Form.Row>
                  <Form.Control
                    type="text"
                    name="name"
                    value={this.props.meal.name}
                    onChange={this.handleMealNameChange}
                    onBlur={this.handleSubmit}
                    required
                    ref={input => { this.mealNameInput = input }} />
                </Form.Row>
              </Form>
            }

            {
              this.props.meal.items.map((item, index) => (
                <MealItem
                  key={index}
                  item={item}
                  itemIndex={index}
                  mealIndex={this.props.mealIndex}
                  onChangeItem={this.props.onChangeMealItem}
                  onRemoveItem={this.props.onRemoveMealItem} />
              ))
            }
          </Col>
        </Row>
        <Row className="pl-3 pr-3 d-flex justify-content-center">
          <Col lg={8}>
            <div className="d-flex justify-content-end">
              <Button
                variant="success"
                onClick={this.handleItemAddition}>
                <span className="oi oi-plus"></span>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
