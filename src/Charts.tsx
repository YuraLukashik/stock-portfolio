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
import {Portfolio} from "./portfolio"
import uuid4 from "uuid/v4"
import {firstPrice, loadSymbolHistory} from "./stock-api"
import {History} from "./portfolio"

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
    portfolio: Portfolio
    portfolioHistory: History
}

const resolved = new Promise<void>((res, rej) => res())

export class Charts extends React.Component<{}, State> {
    state = {
        portfolio: [
            {id: uuid4(), symbol: "GOOGL", percent: 10},
            {id: uuid4(), symbol: "MSFT", percent: 80},
            {id: uuid4(), symbol: "USD", percent: 10}
        ],
        portfolioHistory: []
    }

    portfolioGraph = async () => {
        const {portfolio} = this.state
        const histories = await Promise.all(
            portfolio.map(async stock => {
                const stockHistory = await loadSymbolHistory(stock.symbol)
                const initialPrice = firstPrice(stockHistory)
                return stockHistory.map(item => {
                    item.price = item.price / initialPrice * (stock.percent / 100.)
                    return item
                })
            })
        )
        if (histories.length < 1) {
            return []
        }
        return histories[0].map((item, i) => {
            const price = histories.reduce((sum, h, __, all) => {
                return sum + h[i].price
            }, 0)
            return {
                price,
                day: item.day
            }
        })
    }

    async componentDidMount() {
        const h = await this.portfolioGraph()
        this.setState({
            portfolioHistory: h
        })
    }

    render() {
        this.portfolioGraph()
        return <Container>
            <MaterialTable
                editable={{
                    isEditable: rowData => true,
                    isDeletable: rowData => true,
                    onRowDelete: row => {
                        this.setState({
                            portfolio: this.state.portfolio.filter(
                                stock => stock.id !== row.id
                            )
                        })
                        return resolved
                    },
                    onRowUpdate: (newData) => {
                        this.setState({
                            portfolio: this.state.portfolio.map(
                                stock => stock.id === newData.id ? newData : stock
                            )
                        })
                        return resolved
                    },
                    onRowAdd: data => {
                        const portfolio = this.state.portfolio
                        this.setState({
                            portfolio: [...portfolio, {
                                id: uuid4(),
                                ...data
                            }]
                        })
                        return resolved
                    }
                }}
                icons={tableIcons}
                columns={[
                    {title: "Symbol", field: "symbol", type: "string"},
                    {title: "Percent", field: "percent", type: "numeric"},
                ]}
                data={this.state.portfolio}
                title="Portfolio"
            />
            {
                this.state.portfolio.map(stock => {
                    return <SymbolChart key={stock.id} symbol={stock.symbol}/>
                })
            }
            <SymbolChart history={this.state.portfolioHistory}/>
        </Container>
    }
}
