import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Select from 'react-select';

import { changeMealItem, removeMealItem } from '../../../redux/actions/initial-diet';
import { fetchAllComponents } from '../../../redux/actions/components';

const mapStateToProps = (state, props) => {
  return {
    item: state.initialDiet.meals[props.mealIndex].items[props.itemIndex],
    components: state.components
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeMealItem: payload => dispatch(changeMealItem(payload)),
    removeMealItem: payload => dispatch(removeMealItem(payload)),
    fetchAllComponents: () => dispatch(fetchAllComponents())
  }
};

class MealItem extends Component {

  componentDidMount() {
    if (!this.props.components.items.length) {
      this.props.fetchAllComponents();
    }
  }

  handleChange = (event, meta) => {
    let newItem;

    if (!meta) {
      newItem = {
        [event.target.name]: event.target.value
      };
    } else {
      newItem = {
        id: event.value,
        description: event.label
      }
    }

    this.props.changeMealItem({
      mealIndex: this.props.mealIndex,
      itemIndex: this.props.itemIndex,
      item: {
        ...this.props.item,
        ...newItem
      }
    });
  }

  handleRemoval = () => {
    this.props.removeMealItem({
      mealIndex: this.props.mealIndex,
      itemIndex: this.props.itemIndex
    });
  }

  render() {
    return (
      <Form>
        <Form.Row>
          <Form.Group as={Col} lg="9">
            <Select
              name="id"
              placeholder="Componente"
              isSearchable
              isLoading={this.props.components.loading}
              options={this.props.components.items}
              defaultInputValue={this.props.item.description}
              onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col} lg="2">
            <Form.Control
              type="number"
              name="amount"
              value={this.props.item.amount}
              placeholder="Gramas"
              min="0"
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
