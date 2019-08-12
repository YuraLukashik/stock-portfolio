import {firstPrice, loadSymbolHistory, scale} from "./stock-api";
import * as React from "react"
import {Axis, Chart, Geom, Tooltip} from "bizcharts";
import { History } from "./portfolio"

type Props = {
    symbol?: string
    history?: History
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
        if (!this.props.symbol) {
            return
        }
        const data = await loadSymbolHistory(this.props.symbol)
        this.setState({
            data
        })
    }

    render() {
        const data = this.props.history ? this.props.history : this.state.data
        return <Chart height={400} data={data} forceFit>
            <Axis name="price"/>
            <Axis name="day"/>
            <Tooltip crosshairs={{type: 'y'}}/>
            <Geom type="line" position="day*price" size={2} color={'city'}/>
        </Chart>
    }
}
