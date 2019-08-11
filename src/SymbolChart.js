import { loadSymbolHistory } from "./stock-api";
import * as React from "react";
import { Axis, Chart, Geom, Tooltip } from "bizcharts";
export class SymbolChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'data': []
        };
    }
    async componentDidMount() {
        const data = await loadSymbolHistory(this.props.symbol);
        this.setState({
            data
        });
    }
    render() {
        return React.createElement(Chart, { height: 400, data: this.state.data, forceFit: true },
            React.createElement(Axis, { name: "price" }),
            React.createElement(Axis, { name: "day" }),
            React.createElement(Tooltip, { crosshairs: { type: 'y' } }),
            React.createElement(Geom, { type: "line", position: "day*price", size: 2, color: 'city' }));
    }
}
