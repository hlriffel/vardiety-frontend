import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default class MealItem extends Component {
  state = {
    id: null,
    description: '',
    amount: ''
  }

  componentDidMount() {
    const { id, description, amount } = this.props.item;

    this.setState({
      id,
      description,
      amount
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      this.props.onChangeItem && this.props.onChangeItem({ ...this.state }, this.props.itemIndex);
    });
  }

  handleRemoval = () => {
    this.props.onRemoveItem && this.props.onRemoveItem(this.props.itemIndex);
  }

  render() {
    return (
      <Form>
        <Form.Row>
          <Form.Group as={Col} lg="9">
            <Form.Control
              type="text"
              name="description"
              value={this.state.description}
              placeholder="Componente"
              onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col} lg="2">
            <Form.Control
              type="number"
              name="amount"
              value={this.state.amount}
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
