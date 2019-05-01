import * as React from 'react';

import { EditingState, PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableEditColumn, TableEditRow, PagingPanel } from '@devexpress/dx-react-grid-bootstrap4';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import api from '../../../services/api';
import userService from '../../../services/user.service';

const CommandButton = ({
  onExecute, icon, text, hint, color,
}) => (
        <button
            type="button"
            className="btn btn-link"
            style={{ padding: 11 }}
            onClick={(e) => {
                onExecute();
                e.stopPropagation();
            }}
            title={hint}
        >
            <span className={color || 'undefined'}>
                {icon ? <i className={`oi oi-${icon}`} style={{ marginRight: text ? 5 : 0 }} /> : null}
                {text}
            </span>
        </button>
    );

const AddButton = ({ onExecute }) => (
    <CommandButton icon="plus" hint="Create new row" onExecute={onExecute} />
);

const EditButton = ({ onExecute }) => (
    <CommandButton icon="pencil" hint="Edit row" color="text-warning" onExecute={onExecute} />
);

const DeleteButton = ({ onExecute }) => (
    <CommandButton
        icon="trash"
        hint="Delete row"
        color="text-danger"
        onExecute={() => {
            // eslint-disable-next-line
            if (window.confirm('Are you sure you want to delete this row?')) {
                onExecute();
            }
        }}
    />
);

const CommitButton = ({ onExecute }) => (
    <CommandButton icon="check" hint="Save changes" color="text-success" onExecute={onExecute} />
);

const CancelButton = ({ onExecute }) => (
    <CommandButton icon="x" hint="Cancel changes" color="text-danger" onExecute={onExecute} />
);

const commandComponents = {
    add: AddButton,
    edit: EditButton,
    delete: DeleteButton,
    commit: CommitButton,
    cancel: CancelButton,
}

const tableMessages = {
    noData: 'Sem componentes'
}

const Command = ({ id, onExecute }) => {
    const ButtonComponent = commandComponents[id];
    return (
        <ButtonComponent
            onExecute={onExecute}
        />
    );
};

export default class RegisterNutrients extends React.PureComponent {

    constructor(props) {
        super(props);

        this.changeCurrentPage = currentPage => this.setState({ currentPage });
        this.changePageSize = pageSize => this.setState({ pageSize });
    }

    state = {
        nutrients: [],
        loadingNutrient: true,
        selectedGroup: [],
        components: [],
        loadingComponents: true,
        qtNutrient: 0,
        columns: [
            { name: 'id', title: 'ID geral' },
            { name: 'id_component', title: 'Componente' },
            { name: 'id_nutrient', title: 'Nutriente' },
            { name: 'qt_nutrient', title: 'Quantidade' },
        ],
        rows: [],
        currentPage: 5,
        pageSize: 5,
        pageSizes: [5, 10, 0],
    }

    fetchComponents = () => {
        api.get('/nutrient').then(response => {
            this.setState({
                nutrients: [
                    ...response.data.map(c => {
                        return {
                            value: c.id,
                            label: c.ds_nutrient
                        }
                    })
                ],
                loadingNutrient: false
            });
        });

        api.get('/component').then(response => {
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

    renderEditCell = (props) => {
        const { column } = props;

        if (column.name == 'id_component') {
            return this.renderLookupComponent();
        }
        if (column.name == 'id_nutrient') {
            return this.renderLookupNutrient();
        } else if (column.name == 'id') {
            return <TableEditRow.Row {...props} />;
        }
        return <TableEditRow.Cell {...props} width={'350px'} onChange={this.handleChange()} />;
    }

    renderLookupComponent = () => (
        <td
            style={{
                verticalAlign: 'middle',
                padding: 1,
            }}
        >
            <div className="mt-3">
                <Form>
                    <Form.Group>
                        <Select
                            isMulti
                            isSearchable
                            isLoading={this.state.loadingComponents}
                            closeMenuOnSelect={false}
                            options={this.state.components}
                            onChange={this.onChangeList}
                            id="id_component"
                            name="id_component"
                            valueKey="id"
                            labelKey="name"/>
                    </Form.Group>
                </Form>
            </div>
        </td>
    );

    renderLookupNutrient = () => (
        <td
            style={{
                verticalAlign: 'middle',
                padding: 1,
            }}
        >
            <div className="mt-3">
                <Form>
                    <Form.Group>
                        <Select
                            isMulti
                            isSearchable
                            isLoading={this.state.loadingNutrient}
                            closeMenuOnSelect={false}
                            options={this.state.nutrients}
                            onChange={this.onChangeList}
                            id="id_nutrient"
                            name="id_nutrient"
                            valueKey="id"
                            labelKey="nm_nutrient"/>
                    </Form.Group>
                </Form>
            </div>
        </td>
    );

    componentDidMount() {
        this.fetchComponents();

        api.get(`/component-nutrient`).then(response => {
            this.setState({
                rows: [
                    ...response.data.map(r => {
                        return {
                            id: r.id,
                            id_component: r.id_component,
                            id_nutrient: r.id_nutrient,
                            qt_nutrient: r.qt_nutrient
                        }
                    })
                ]
            });
        });
    }

    onChangeList = values => {
        this.setState({
            selectedGroup: [
                ...values.map(v => {
                    return {
                        id: v.value
                    }
                })
            ]
        });
    }

    handleChange = event => {
        if (event) {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    }

    handleSave = () => {

        const data = {
            componentId: this.state.loadingNutrient.id,
            nutrientId: this.state.categories.id,
            nutrientQuant: this.state.qtNutrient
        }

        api.post('/nutrient-component/create', data);
    }

    commitChanges = ({ added, changed, deleted }) => {
        let { rows } = this.state;

        if (added) {
            this.handleSave();
        } else if (changed) {
            rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        } else if (deleted) {
            const deletedSet = new Set(deleted);
            rows = rows.filter(row => !deletedSet.has(row.id));
        }
        this.setState({ rows });
    }

    render() {
        const { columns, rows, currentPage, pageSize, pageSizes } = this.state;

        return (
            <div className="card">
                <Grid
                    rows={rows}
                    columns={columns} >

                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        pageSize={pageSize}
                        onPageSizeChange={this.changePageSize}
                        defaultCurrentPage={0}
                        defaultPageSize={5}
                    />
                    <EditingState
                        onCommitChanges={this.commitChanges} />

                    <IntegratedPaging />

                    <Table
                        messages={tableMessages} />
                    <TableHeaderRow />
                    <TableEditRow cellComponent={this.renderEditCell} />
                    <TableEditColumn
                        showAddCommand
                        showEditCommand
                        showDeleteCommand
                        commandComponent={Command} />
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                </Grid>
            </div>
        );
    }
}
