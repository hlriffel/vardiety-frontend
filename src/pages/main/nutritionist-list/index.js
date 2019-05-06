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
  addCommand: 'Adicionar',
  commitCommand: 'Salvar',
  cancelCommand: 'Cancelar',
  showDeleteConfirmDialog: true
};

const tableMessages = {
  noData: 'Sem pacientes'
}

const getRowId = row => row.id;

export default class NutritionistList extends Component {

  state = {
    columns: [
      { name: 'nm_nutritionist', title: 'Nome do Nutricionista' },
      { name: 'ds_email', title: 'E-mail' },
      { name: 'actions', title: 'Ações' }
    ],
    editingStateColumnExtensions: [
      { columnName: 'nm_nutritionist', editingEnabled: false },
    ],
    addedRows: [],
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

  changeAddedRows = addedRows => {
    const initialized = addedRows.map(row => row);
    this.setState({ addedRows: initialized });
  }

  addActions = patientId => {
    return (
      <ButtonGroup>
        <Button
          variant="outline-primary"
          onClick={() => {
            this.setState({
              toViewCalendar: {
                state: true,
                patientId
              }
            })
          }}>
          Calendário
        </Button>

        <Button
          variant="outline-primary"
          onClick={() => {
            this.setState({
              toInitialDiet: {
                state: true,
                patientId
              }
            })
          }}>
          Dieta inicial
        </Button>
      </ButtonGroup>
    )
  }

  loadNutritionists = () => {
    api.get(`/nutritionist-patient/${userService.id}`).then(response => {
      this.setState({
        rows: [
          ...response.data.map(r => {
            return {
              id: r.id,
              nm_nutritionist: r.nutritionist.nm_person,
              ds_email: r.nutritionist.ds_email,
              actions: this.addActions.call(this, r.patient.id)
            }
          })
        ]
      });
    });
  }

  componentDidMount() {
    this.loadNutritionists();
  }

  commitChanges = ({ added, changed, deleted }) => {
    let { rows } = this.state;

    if (added) {
      const newPatient = added[0];

      api.post(`/nutritionist-patient/create`, {
        nutritionistId: userService.id,
        patientEmail: newPatient.ds_email
      }).then(() => {
        this.loadNutritionists();
      });
    }

    if (changed) {
    
    }

    if (deleted) {
      api.delete(`/nutritionist-patient/${deleted}`).then(() => {
        this.loadNutritionists();
      });
    }
  }

  render() {
    if (this.state.toViewCalendar.state === true) {
      return (<Redirect to={`/main/view-calendar/${this.state.toViewCalendar.patientId}`} />)
    }

    if (this.state.toInitialDiet.state === true) {
      return (<Redirect to={`/main/initial-diet/${this.state.toInitialDiet.patientId}/diet`} />)
    }

    const { columns, rows, addedRows, editingStateColumnExtensions } = this.state;

    return (
      <div className="card">
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId} >

          <EditingState
            columnExtensions={editingStateColumnExtensions}
            onCommitChanges={this.commitChanges}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows} />
          <Table
            messages={tableMessages} />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn
            showAddCommand={!addedRows.length}
            showEditCommand
            showDeleteCommand
            messages={editColumnMessages} />
        </Grid>
      </div>
    );
  }
}
