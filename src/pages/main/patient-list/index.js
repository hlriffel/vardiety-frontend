import React, { Component } from 'react';

import { Redirect } from 'react-router';

import { EditingState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableEditColumn, TableEditRow, TableColumnVisibility} from '@devexpress/dx-react-grid-bootstrap4';

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

export default class PatientList extends Component {
  state = {
    columns: [
      { name: 'nm_patient', title: 'Nome do paciente' },
      { name: 'ds_email', title: 'E-mail' },
      { name: 'actions', title: 'Ações' }
    ],
    editingStateColumnExtensions: [
      { columnName: 'nm_patient', editingEnabled: false }
    ],
    //defaultHiddenColumnNames: ['actions'],
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

  loadPatients = () => {
    api.get(`/nutritionist-patient/${userService.id}`).then(response => {
      this.setState({
        rows: [
          ...response.data.map(r => {
            return {
              id: r.id,
              nm_patient: r.patient.nm_person,
              ds_email: r.patient.ds_email,
              actions: this.addActions.call(this, r.patient.id)
            }
          })
        ]
      });
    });
  }

  componentDidMount() {
    this.loadPatients();
  }

  commitChanges = ({ added, changed, deleted }) => {
    let { rows } = this.state;

    if (added) {
      const newPatient = added[0];

      api.post(`/nutritionist-patient/create`, {
        nutritionistId: userService.id,
        patientEmail: newPatient.ds_email
      }).then(() => {
        this.loadPatients();
      });
    }

    if (changed) {
      rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }

    if (deleted) {
      api.delete(`/nutritionist-patient/${deleted}`).then(() => {
        this.loadPatients();
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

    const { columns, rows, addedRows, editingStateColumnExtensions, defaultHiddenColumnNames } = this.state;

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
             <TableColumnVisibility
            defaultHiddenColumnNames={defaultHiddenColumnNames}
          />
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
