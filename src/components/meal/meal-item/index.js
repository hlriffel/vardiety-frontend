import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { changeMealItem, removeMealItem } from '../../../redux/actions/initial-diet';

const mapStateToProps = (state, props) => {
  return {
    item: state.initialDiet.meals[props.mealIndex].items[props.itemIndex]
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeMealItem: (mealIndex, itemIndex, item) => dispatch(changeMealItem(mealIndex, itemIndex, item)),
    removeMealItem: (mealIndex, itemIndex) => dispatch(removeMealItem(mealIndex, itemIndex))
  }
};

class MealItem extends Component {

  handleChange = event => {
    this.props.changeMealItem(this.props.mealIndex, this.props.itemIndex, {
      ...this.props.item,
      [event.target.name]: event.target.value
    });
  }

  handleRemoval = () => {
    this.props.removeMealItem(this.props.mealIndex, this.props.itemIndex);
  }

  render() {
    return (
      <Form>
        <Form.Row>
          <Form.Group as={Col} lg="9">
            <Form.Control
              type="text"
              name="description"
              value={this.props.item.description}
              placeholder="Componente"
              onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col} lg="2">
            <Form.Control
              type="number"
              name="amount"
              value={this.props.item.amount}
              placeholder="Gramas"
              onChange={this.handleChange} />
          </Form.Group>

          <Form.Group className="ml-2">
            <Button
              variant="danger"
              onClick={this.handleRemoval}>
              <span className="oi oi-x"></span>
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealItem);
