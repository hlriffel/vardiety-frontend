import React, { Component } from 'react';

import { EditingState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableEditColumn, TableEditRow } from '@devexpress/dx-react-grid-bootstrap4';

import api from '../../../services/api';
import userService from '../../../services/user.service';

const editColumnMessages = {
    editCommand: 'Editar',
    deleteCommand: 'Deletar',
};

export default class PatientList extends Component {
    state = {
        columns: [
            { name: 'id', title: 'ID geral' },
            { name: 'nm_nutritionist', title: 'Nome do nutricionista' },
            { name: 'nm_patient', title: 'Nome do paciente' },
        ],
        rows: []
    }

    componentDidMount() {
        api.get(`/nutritionist-patient/${userService.id}`).then(response => {
            this.setState({
                rows: [
                    ...response.data.map(r => {
                        return {
                            id: r.id,
                            nm_nutritionist: r.nutritionist.nm_person,
                            nm_patient: r.patient.nm_person
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
        const { columns, rows } = this.state;

        return (
            <div className="card">
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <EditingState
                        onCommitChanges={this.commitChanges}
                    />
                    <Table />
                    <TableHeaderRow />
                    <TableEditRow />
                    <TableEditColumn
                        showEditCommand
                        showDeleteCommand
                        messages={editColumnMessages}
                    />
                </Grid>
            </div>
        );
    }

    // render() {
    //     return (
    //         <div id="patient-list" className="mt-3">
    //             <table class="table">
    //                 <thead>
    //                     <tr>
    //                         <th scope="col">#</th>
    //                         <th scope="col">Paciente</th>
    //                         <th scope="col">Editar</th>
    //                         <th scope="col">Excluir</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody id='patient-list-body' dangerouslySetInnerHTML={{__html: this.buildTableBody()}}>
                        
    //                 </tbody>
    //             </table>
    //         </div>
    //     );
    // }
}
