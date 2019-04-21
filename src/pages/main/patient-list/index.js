import React, { Component } from 'react';

import { Redirect } from 'react-router';

import { EditingState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableEditColumn, TableEditRow } from '@devexpress/dx-react-grid-bootstrap4';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import api from '../../../services/api';
import userService from '../../../services/user.service';

const editColumnMessages = {
  editCommand: 'Editar',
  deleteCommand: 'Deletar',
};

const tableMessages = {
  noData: 'Sem pacientes'
}

export default class PatientList extends Component {
  state = {
    columns: [
      { name: 'id', title: 'ID geral' },
      { name: 'nm_nutritionist', title: 'Nome do nutricionista' },
      { name: 'nm_patient', title: 'Nome do paciente' },
      { name: 'actions', title: 'Ações' }
    ],
    rows: [],
    toInitialDiet: {
      state: false,
      patientId: null
    },
    toViewCalendar: {
      state: false,
      patientId: null
    }
  }

  addActions = patientId => {
    return (
      <ButtonGroup>
        <Button
          variant="outline-primary"
          onClick={() => { this.setState({ toViewCalendar: {
            state: true,
            patientId
          } }) }}>
          Calendário
        </Button>

        <Button
          variant="outline-primary"
          onClick={() => { this.setState({ toInitialDiet: {
            state: true,
            patientId
          } }) }}>
          Dieta inicial
        </Button>
      </ButtonGroup>
    )
  }

  componentDidMount() {
    api.get(`/nutritionist-patient/${userService.id}`).then(response => {
      this.setState({
        rows: [
          ...response.data.map(r => {
            return {
              id: r.id,
              nm_nutritionist: r.nutritionist.nm_person,
              nm_patient: r.patient.nm_person,
              actions: this.addActions.call(this, r.patient.id)
            }
          })
        ]
      });
    });
  }

  commitChanges = ({ added, changed, deleted }) => {
    let { rows } = this.state;

    if (changed) {
      rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      rows = rows.filter(row => !deletedSet.has(row.id));
    }
    this.setState({ rows });
  }

  render() {
    if (this.state.toViewCalendar.state === true) {
      return (<Redirect to={`/main/view-calendar/${userService.id}/${this.state.toViewCalendar.patientId}`} />)
    }

    if (this.state.toInitialDiet.state === true) {
      return (<Redirect to={`/main/initial-diet/${this.state.toInitialDiet.patientId}/diet`} />)
    }

    const { columns, rows } = this.state;

    return (
      <div className="card">
        <Grid
          rows={rows}
          columns={columns} >

          <EditingState
            onCommitChanges={this.commitChanges} />
          <Table
            messages={tableMessages} />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn
            showEditCommand
            showDeleteCommand
            messages={editColumnMessages} />
        </Grid>
      </div>
    );
  }
}
