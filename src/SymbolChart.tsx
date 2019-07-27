import {firstPrice, loadSymbolHistory, scale} from "./stock-api";
import React from "react"
import {Axis, Chart, Geom, Tooltip} from "bizcharts";

export class SymbolChart extends React.Component {
    constructor() {
        super()
        this.state = {
            'data': []
        }
    }

    async componentDidMount() {
        const data = await loadSymbolHistory(this.props.symbol)
        this.setState({
            data
        })
    }

    render() {
        return <Chart height={400} data={this.state.data} forceFit>
            <Axis name="price"/>
            <Axis name="day"/>
            <Tooltip crosshairs={{type: 'y'}}/>
            <Geom type="line" position="day*price" size={2} color={'city'}/>
        </Chart>
    }
}
