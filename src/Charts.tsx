import * as React from "react"
import {SymbolChart} from "./SymbolChart";
import Container from "@material-ui/core/Container";
import MaterialTable from "material-table";
import {forwardRef, Ref} from 'react';

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

type SvgRef = Ref<SVGSVGElement>

const tableIcons = {
    Add: forwardRef((props, ref: SvgRef) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref: SvgRef) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref: SvgRef) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref: SvgRef) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref: SvgRef) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref: SvgRef) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref: SvgRef) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref: SvgRef) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref: SvgRef) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref: SvgRef) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref: SvgRef) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref: SvgRef) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref: SvgRef) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref: SvgRef) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref: SvgRef) => <ArrowUpward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref: SvgRef) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref: SvgRef) => <ViewColumn {...props} ref={ref}/>)
};

type State = {
    symbols: string[]
}

export class Charts extends React.Component<{}, State> {
    state = {
        'symbols': ['GOOGL', 'AAPL']
    }

    render() {
        return <Container>
            <MaterialTable
                editable={{
                    isEditable: rowData => true,
                    isDeletable: rowData => true,
                }}
                icons={tableIcons}
                columns={[
                    {title: "Symbol", field: "symbol"},
                    {title: "Percent", field: "percent"},
                ]}
                data={[
                    {symbol: "GOOGL", percent: 70}
                ]}
                title="Portfolio"
            />
            {
                this.state.symbols.map(symbol => {
                    return <SymbolChart key={symbol} symbol={symbol}/>
                })
            }
        </Container>
    }
}
