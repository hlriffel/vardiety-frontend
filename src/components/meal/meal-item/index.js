import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Select from 'react-select';

import { fetchAllComponents } from '../../../redux/actions/components';

const mapStateToProps = state => {
  return {
    components: state.components
  }
};

const mapDispatchToProps = dispatch => {
  return {
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
    if (!this.props.onChangeItem) return;

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

    this.props.onChangeItem({
      mealIndex: this.props.mealIndex,
      itemIndex: this.props.itemIndex,
      item: {
        ...this.props.item,
        ...newItem
      }
    });
  }

  handleRemoval = () => {
    this.props.onRemoveItem && this.props.onRemoveItem({
      mealIndex: this.props.mealIndex,
      itemIndex: this.props.itemIndex
    });
  }

  render() {
    return (
      <Form>
        <Form.Row className="d-flex justify-content-between m-0">
          <Form.Group as={Col} lg="8">
            <Select
              name="id"
              placeholder="Componente"
              isSearchable
              isLoading={this.props.components.loading}
              options={this.props.components.items}
              value={{ value: this.props.item.id, label: this.props.item.description }}
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
              onClick={this.handleRemoval} >
              <span className="oi oi-x"></span>
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealItem);
