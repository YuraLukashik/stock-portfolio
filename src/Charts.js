import * as React from "react";
import { SymbolChart } from "./SymbolChart";
import Container from "@material-ui/core/Container";
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
const tableIcons = {
    Add: forwardRef((props, ref) => React.createElement(AddBox, Object.assign({}, props, { ref: ref }))),
    Check: forwardRef((props, ref) => React.createElement(Check, Object.assign({}, props, { ref: ref }))),
    Clear: forwardRef((props, ref) => React.createElement(Clear, Object.assign({}, props, { ref: ref }))),
    Delete: forwardRef((props, ref) => React.createElement(DeleteOutline, Object.assign({}, props, { ref: ref }))),
    DetailPanel: forwardRef((props, ref) => React.createElement(ChevronRight, Object.assign({}, props, { ref: ref }))),
    Edit: forwardRef((props, ref) => React.createElement(Edit, Object.assign({}, props, { ref: ref }))),
    Export: forwardRef((props, ref) => React.createElement(SaveAlt, Object.assign({}, props, { ref: ref }))),
    Filter: forwardRef((props, ref) => React.createElement(FilterList, Object.assign({}, props, { ref: ref }))),
    FirstPage: forwardRef((props, ref) => React.createElement(FirstPage, Object.assign({}, props, { ref: ref }))),
    LastPage: forwardRef((props, ref) => React.createElement(LastPage, Object.assign({}, props, { ref: ref }))),
    NextPage: forwardRef((props, ref) => React.createElement(ChevronRight, Object.assign({}, props, { ref: ref }))),
    PreviousPage: forwardRef((props, ref) => React.createElement(ChevronLeft, Object.assign({}, props, { ref: ref }))),
    ResetSearch: forwardRef((props, ref) => React.createElement(Clear, Object.assign({}, props, { ref: ref }))),
    Search: forwardRef((props, ref) => React.createElement(Search, Object.assign({}, props, { ref: ref }))),
    SortArrow: forwardRef((props, ref) => React.createElement(ArrowUpward, Object.assign({}, props, { ref: ref }))),
    ThirdStateCheck: forwardRef((props, ref) => React.createElement(Remove, Object.assign({}, props, { ref: ref }))),
    ViewColumn: forwardRef((props, ref) => React.createElement(ViewColumn, Object.assign({}, props, { ref: ref })))
};
export class Charts extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            'symbols': ['GOOGL', 'AAPL']
        };
    }
    render() {
        return React.createElement(Container, null,
            React.createElement(MaterialTable, { editable: {
                    isEditable: rowData => true,
                    isDeletable: rowData => true,
                }, icons: tableIcons, columns: [
                    { title: "Symbol", field: "symbol" },
                    { title: "Percent", field: "percent" },
                ], data: [
                    { symbol: "GOOGL", percent: 70 }
                ], title: "Portfolio" }),
            this.state.symbols.map(symbol => {
                return React.createElement(SymbolChart, { key: symbol, symbol: symbol });
            }));
    }
}
