import React, {Component} from 'react';
import * as d3 from 'd3';
import './d3.css';


class PieChart extends Component {
    constructor(){
        super();
        this.state = {
            pie0:1,
            pie1:1,
            pie2:1,
            pie3:1,
            pie4:1,
            pie5:1,
        }
    }
    componentDidMount(){
        var container = this.container;

        function pieChart(container) {
            var _chart = {};

            var _width = 400, _height = 400,
                _data = [],
                _colors = d3.scaleOrdinal(d3.schemeCategory20),
                _svg,
                _bodyG,
                _pieG,
                _radius = 200,
                _innerRadius = 100;

            _chart.render = function() {
                if(!_svg) {
                    _svg = d3.select(container).append("svg")
                        .attr("height", _height)
                        .attr("width", _width);
                }

                renderBody(_svg);
            }

            function renderBody(svg) {
                if(!_bodyG)
                    _bodyG = svg.append("g")
                        .attr("class", "body")

                renderPie();
            }

            function renderPie() {
                var pie = d3.pie()
                    .sort(function(d) {
                        return d.id;
                    })
                    .value(function(d) {
                        return d.value;
                    });

                var arc = d3.arc()
                    .outerRadius(_radius)
                    .innerRadius(_innerRadius);

                if(!_pieG)
                    _pieG = _bodyG.append("g")
                        .attr("class", "pie")
                        .attr("transform", "translate("+_radius+","+_radius+")");

                renderSlices(pie, arc);

                renderLabels(pie, arc);
            }

            function renderSlices(pie, arc) {
                var slices = _pieG.selectAll("path.arc")
                    .data(pie(_data));//将纯函数转为圆弧数据

                slices.enter()
                    .append("path")
                    .attr("class", "arc")
                    .attr("fill", function(d, i) {
                        return _colors(i)
                    })
                    .transition()
                    .attrTween("d", function(d) {//必须在enter 的时候写一次，否则，第一次不渲染
                        var currentArc = this.__current__;
                        if(!currentArc){
                            currentArc = {startAngle: 0, endAngle: 0};
                        }

                        var interpolate = d3.interpolate(currentArc, d);//使数据变化从当前元素开始，而非0
                        this.__current__ = interpolate(1);//将当前弧度设置为最新值；
                        return function(t) {
                            return arc(interpolate(t))
                        }
                    })

                slices.transition()
                    .attrTween("d", function(d) {//除了第一次渲染，之后的updata都是走这里
                        var currentArc = this.__current__;

                        if(!currentArc){
                            currentArc = {startAngle: 0, endAngle: 0};
                        }

                        var interpolate = d3.interpolate(currentArc, d);//使数据变化从当前元素开始，而非0
                        this.__current__ = interpolate(1);//将当前弧度设置为最新值；
                        return function(t) {
                            return arc(interpolate(t))
                        }
                    })
            }

            function renderLabels(pie, arc) {
                var labels = _pieG.selectAll("text.label")
                    .data(pie(_data));//将纯函数转为圆弧数据

                labels.enter()
                    .append("text")
                    .attr("class", "label")
                    .transition()
                    .attr("transform", function (d) {
                        return "translate("
                            + arc.centroid(d) + ")";
                    })
                    .attr("dy", ".35em")
                    .attr("text-anchor", "middle")
                    .text(function (d) {
                        return d.data.id;
                    });

                labels.transition()
                    .attr("transform", function (d) {
                        return "translate("
                            + arc.centroid(d) + ")";
                    })
            }

            _chart.width = function (w) {
                if (!arguments.length) return _width;
                _width = w;
                return _chart;
            };
            _chart.height = function (h) {
                if (!arguments.length) return _height;
                _height = h;
                return _chart;
            };
            _chart.colors = function (c) {
                if (!arguments.length) return _colors;
                _colors = c;
                return _chart;
            };
            _chart.radius = function (r) {
                if (!arguments.length) return _radius;
                _radius = r;
                return _chart;
            };
            _chart.innerRadius = function (r) {
                if (!arguments.length) return _innerRadius;
                _innerRadius = r;
                return _chart;
            };
            _chart.data = function (d) {
                if (!arguments.length) return _data;
                _data = d;
                return _chart;
            };

            return _chart;
        }

        var { pie0,pie1,pie2,pie3,pie4,pie5 } = this.state
        var data = [
            {id:0,value:pie0},
            {id:1,value:pie1},
            {id:2,value:pie2},
            {id:3,value:pie3},
            {id:4,value:pie4},
            {id:5,value:pie5},
        ];
        var chart = pieChart(container)
            .radius(200)
            .innerRadius(0)
            .data(data);
        chart.render();
        this.chart = chart;
        this.data = data;
    }
    render(){
        var { pie0,pie1,pie2,pie3,pie4,pie5 } = this.state;
        return (
            <div className="Dcontainer" ref={(con) => this.container = con}>
                <div className="Dform">
                    <p><label><span>0</span> <input type="number" onChange={this.setPie0.bind(this)} value={pie0}/> </label></p>
                    <p><label><span>1</span> <input type="number" onChange={this.setPie1.bind(this)} value={pie1}/> </label></p>
                    <p><label><span>2</span> <input type="number" onChange={this.setPie2.bind(this)} value={pie2}/> </label></p>
                    <p><label><span>3</span> <input type="number" onChange={this.setPie3.bind(this)} value={pie3}/> </label></p>
                    <p><label><span>4</span> <input type="number" onChange={this.setPie4.bind(this)} value={pie4}/> </label></p>
                    <p><label><span>5</span> <input type="number" onChange={this.setPie5.bind(this)} value={pie5}/> </label></p>
                    <div> <button onClick={this.reset.bind(this)}>重置</button> </div>
                </div>
            </div>
        )
    }

    setPie0(event){
        var value = parseInt(event.target.value, 10);
        if(typeof value !=='number') return;
        this.setState({
            pie0:value
        });
        this.data[0].value = value;
        this.chart.render();
    }

    setPie1(event){
        var value = parseInt(event.target.value, 10);
        if(typeof value !=='number') return;
        this.setState({
            pie1:value
        });
        this.data[1].value = value;
        this.chart.render();
    }

    setPie2(event){
        var value = parseInt(event.target.value, 10);
        if(typeof value !=='number') return;
        this.setState({
            pie2:value
        });
        this.data[2].value = value;
        this.chart.render();
    }

    setPie3(event){
        var value = parseInt(event.target.value, 10);
        if(typeof value !=='number') return;
        this.setState({
            pie3:value
        });
        this.data[3].value = value;
        this.chart.render();
    }

    setPie4(event){
        var value = parseInt(event.target.value, 10);
        if(typeof value !=='number') return;
        this.setState({
            pie4:value
        });
        this.data[4].value = value;
        this.chart.render();
    }

    setPie5(event){
        var value = parseInt(event.target.value, 10);
        if(typeof value !=='number') return;
        this.setState({
            pie5:value
        });
        this.data[5].value = value;
        this.chart.render();
    }

    reset(){
        var data = this.data;
        for (var j = 0; j < data.length; ++j)
            data[j].value = 1;

        this.setState({
            pie0:1,
            pie1:1,
            pie2:1,
            pie3:1,
            pie4:1,
            pie5:1,
        })
        this.chart.render();
    }
}

export default PieChart