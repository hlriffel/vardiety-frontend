import React, { Component } from 'react';

import Select from 'react-select';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import api from '../../../services/api';
import userService from '../../../services/user.service';

export default class RegisterRestrictions extends Component {
  state = {
    components: [],
    loadingComponents: true,
    selectedComponents: [],
    userRestrictions: [],
    selectRef: null
  }

  fetchComponents = () => {
    return api.get('/component').then(response => {
      this.setState({
        components: [
          ...response.data.map(c => {
            return {
              value: c.id,
              label: c.nm_component
            }
          })
        ],
        loadingComponents: false
      });
    });
  }

  fetchUserRestrictions = () => {
    return api.get(`/user/${userService.id}/restrictions`).then(response => {
      this.setState({
        userRestrictions: response.data
      });
    });
  }

  fillRestrictions = () => {
    this.setState({
      selectedComponents: this.state.userRestrictions.map(r => {
        return {
          value: r.id_component,
          label: r.component.nm_component
        }
      })
    }, () => {
      this.refs.selectRef.select.setValue(this.state.selectedComponents);
    });
  }

  componentDidMount() {
    this.fetchComponents().then(() => {
      this.fetchUserRestrictions().then(() => {
        this.fillRestrictions();
      });
    });
  }

  onChangeList = values => {
    this.setState({
      selectedComponents: [
        ...values.map(v => {
          return {
            id: v.value
          }
        })
      ]
    });
  }

  handleSave = () => {
    const restrictions = this.state.selectedComponents.map(comp => {
      return {
        id_user: userService.id,
        id_component: comp.id
      }
    });

    api.post(`/user/${userService.id}/restrictions`, restrictions);
  }

  render() {
    return (
      <div id="register-restrictions" className="mt-3">
        <Container>
          <Row className="d-flex justify-content-center">
            <Col md={8}>
              <h1>Registro de Restrições</h1>

              <div className="mt-4">
                <Form>
                  <Form.Group>
                    <Select
                      isMulti
                      isSearchable
                      isLoading={this.state.loadingComponents}
                      closeMenuOnSelect={false}
                      options={this.state.components}
                      ref="selectRef"
                      onChange={this.onChangeList}
                      placeholder="Restrição" />
                  </Form.Group>
                </Form>
              </div>
            </Col>
          </Row>

          <Row className="mt-3 d-flex justify-content-center">
            <Col md={8} className="d-flex justify-content-end">
              <Button variant="primary" onClick={this.handleSave}>
                Salvar
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
