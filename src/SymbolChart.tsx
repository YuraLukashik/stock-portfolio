import {firstPrice, loadSymbolHistory, scale} from "./stock-api";
import * as React from "react"
import {Axis, Chart, Geom, Tooltip} from "bizcharts";

type Props = {
    symbol: string
}

type State = {
    data: any
}

export class SymbolChart extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
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
