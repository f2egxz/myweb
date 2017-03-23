import React, { Component } from 'react';
import '../App.css';
import LineChart from './LinearChart.js'
import AreaChart from './AreaChart.js'
import PointChart from './PointChart.js'
import BarChart from './BarChart.js'
import PieChart from './PieChart.js'


class Chart extends Component {
    constructor(){
        super();
        this.state = {
            active: 'line'
        }
    }
    render() {
        let Chart = <LineChart />;
        switch (this.state.active){
            case 'line':
                Chart = <LineChart />;
                break;
            case 'area':
                Chart = <AreaChart/>;
                break;
            case 'point':
                Chart = <PointChart/>;
                break;
            case 'bar':
                Chart = <BarChart/>;
                break;
            case 'pie':
                Chart = <PieChart/>;
                break;
            default:
                Chart = <LineChart />;
                break;
        }

        return (
                <div className="container">
                    <div className="sidbar">
                        <p data-type="line" className={"sidbarItem "+(this.state.active==='line'? 'Dactive': '')} onClick={this.showSVG.bind(this)}>折线图</p>
                        <p data-type="area" className={"sidbarItem "+(this.state.active==='area'? 'Dactive': '')} onClick={this.showSVG.bind(this)}>面积图</p>
                        <p data-type="point" className={"sidbarItem "+(this.state.active==='point'?'Dactive': '')} onClick={this.showSVG.bind(this)}>散点图</p>
                        <p data-type="bar" className={"sidbarItem "+(this.state.active==='bar' ? 'Dactive': '')} onClick={this.showSVG.bind(this)}>条形图</p>
                        <p data-type="pie" className={"sidbarItem "+(this.state.active==='pie' ? 'Dactive': '')} onClick={this.showSVG.bind(this)}>饼图</p>
                    </div>
                    <div className="showArea">
                        {
                            Chart
                        }
                    </div>
                </div>
        );
    }
    showSVG(type){
        this.setState({
            active: type.target.dataset.type
        });
    }
}

export default Chart;