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
};

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

export default class RegisterComponents extends React.PureComponent {

    constructor(props) {
        super(props);

        this.changeCurrentPage = currentPage => this.setState({ currentPage });
        this.changePageSize = pageSize => this.setState({ pageSize });
    }

    state = {
        categories: [],
        loadingCategories: true,
        nmComponent: '',
        selectedGroup: [],
        columns: [
            { name: 'id', title: 'ID geral' },
            { name: 'nm_component', title: 'Descrição do componente' },
            {
                name: 'id_category',
                title: 'Categoria'
            }
        ],
        rows: [],
        currentPage: 5,
        pageSize: 5,
        pageSizes: [5, 10, 0],
    };

    fetchComponents = () => {
        api.get('/component-category').then(response => {
            this.setState({
                categories: [
                    ...response.data.map(c => {
                        return {
                            value: c.id,
                            label: c.nm_category
                        }
                    })
                ],
                loadingCategories: false
            });
        });
    }

    renderEditCell = (props) => {
        const { column } = props;

        if (column.name == 'id_category') {
            return this.renderLookupEditCell();
        } else if (column.name == 'id') {
            return <TableEditRow.Row {...props} />;
        }
        return <TableEditRow.Cell {...props} width={'350px'} onChange={this.handleChange()} />;
    };

    componentDidMount() {
        this.fetchComponents();

        api.get(`/component`).then(response => {
            this.setState({
                rows: [
                    ...response.data.map(r => {
                        return {
                            id: r.id,
                            nm_component: r.nm_component,
                            id_category: r.id_category
                        }
                    })
                ]
            });
        });
    }

    renderLookupEditCell = () => (
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
                            isLoading={this.state.loadingCategories}
                            closeMenuOnSelect={false}
                            options={this.state.categories}
                            onChange={this.handleChangeList}
                            id="id_category"
                            name="id_category"
                            valueKey="id"
                            labelKey="nm_category" />
                    </Form.Group>
                </Form>
            </div>
        </td>
    )

    handleChange = value => {
        if (value) {
            this.setState({
                nm_component: value
            });
        }
    }

    handleSave = () => {

        const data = {
            componentName: this.state.nmComponent,
            categoryId: this.state.selectedGroup[0].id
        }

        api.post('/component/create', data);
    }

    handleChangeList = values => {
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
