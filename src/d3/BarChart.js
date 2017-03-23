import React, {Component} from 'react';
import * as d3 from 'd3';
import './d3.css';


class BarChart extends Component {
    componentDidMount(){
        var container = this.container,
            randomData = this.randomData;

        var numberOfDataPoint = 31,
            data = [];
        data = d3.range(numberOfDataPoint).map(function (i) {
            return {x: i, y: randomData()};
        });
        var chart = this.barChart(container)
            .x(d3.scaleLinear().domain([-1, 32]))
            .y(d3.scaleLinear().domain([0, 10]));
        chart.setSeries(data);
        chart.render();
        this.chart = chart;
        this.data = data;
    }
    render(){
        return (
            <div className="Dcontainer" ref={(con) => this.container = con}>
                <button onClick={this.update.bind(this)}>更新</button>
            </div>
        )
    }
    barChart(container) {
        var _chart = {};

        var _width = 600, _height = 250,
            _margins = {top: 30, left: 30, right: 30, bottom: 30},
            _x, _y,
            _data = [],
            _colors = d3.scaleOrdinal(d3.schemeCategory10),
            _svg,
            _bodyG;

        _chart.render = function() {
            if(!_svg) {
                _svg = d3.select(container).append("svg")
                    .attr("height", _height)
                    .attr("width",_width)

                renderAxes(_svg);

                defineBodyClip(_svg);
            }

            renderBody(_svg);
        };

        function renderAxes(svg) {
            var axesG = svg.append("g")
                .attr("class", "axes");
            var xAxis = d3.axisBottom(_x.range([0, quadrantWidth()]))

            var yAxis = d3.axisLeft(_y.range([quadrantHeight(), 0]))

            axesG.append("g")
                .attr("class", "axis")
                .attr("transform", function () {
                    return "translate(" + xStart() + "," + yStart() + ")";
                })
                .call(xAxis);
            axesG.append("g")
                .attr("class", "axis")
                .attr("transform", function () {
                    return "translate(" + xStart() + "," + yEnd() + ")";
                })
                .call(yAxis);
        }

        function defineBodyClip(svg) {
            var padding = 5;
            svg.append("defs")
                .append("clipPath")
                .attr("id", "body-clip")
                .append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", quadrantWidth() + 2 * padding)
                .attr("height", quadrantHeight());
        }

        function renderBody(svg) {
            if (!_bodyG)
                _bodyG = svg.append("g")
                    .attr("class", "body")
                    .attr("transform", "translate("
                        + xStart()
                        + ","
                        + yEnd() + ")")
                    .attr("clip-path", "url(#body-clip)");
            renderBars();
        }

        function renderBars() {
            var padding = 2;
            _bodyG.selectAll("rect.bar")
                .data(_data)
                .enter()
                .append("rect")
                .attr("class", "bar");
            _bodyG.selectAll("rect.bar")
                .data(_data)
                .transition()
                .attr("x", function (d) {
                    return _x(d.x);
                })
                .attr("y", function (d) {
                    return _y(d.y);
                })
                .attr("height", function (d) {
                    return yStart() - _y(d.y);
                })
                .attr("width", function(d){
                    return Math.floor(quadrantWidth() / _data.length) - padding;
                })
                .attr("fill", function(d, i){
                    return _colors(i)
                });
        }

        function xStart() {
            return _margins.left;
        }
        function yStart() {
            return _height - _margins.bottom;
        }
        function yEnd() {
            return _margins.top;
        }
        function quadrantWidth() {
            return _width - _margins.left - _margins.right;
        }
        function quadrantHeight() {
            return _height - _margins.top - _margins.bottom;
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
        _chart.margins = function (m) {
            if (!arguments.length) return _margins;
            _margins = m;
            return _chart;
        };
        _chart.colors = function (c) {
            if (!arguments.length) return _colors;
            _colors = c;
            return _chart;
        };
        _chart.x = function (x) {
            if (!arguments.length) return _x;
            _x = x;
            return _chart;
        };
        _chart.y = function (y) {
            if (!arguments.length) return _y;
            _y = y;
            return _chart;
        };
        _chart.setSeries = function (series) {
            _data = series;
            return _chart;
        };
        return _chart;
    }

    randomData() {
        return Math.random() * 9;
    }

    update() {
        var randomData = this.randomData;
        var numberOfDataPoint = 31;
        this.data.length = 0;
        for (var j = 0; j < numberOfDataPoint; ++j)
            this.data.push({x: j, y: randomData()});
        this.chart.render();
    }

}

export default BarChart