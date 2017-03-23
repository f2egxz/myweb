import React, {Component} from 'react';
import * as d3 from 'd3';
import './d3.css';


class PointChart extends Component {
    componentDidMount() {
        var container = this.container


        var numberOfSeries = 3,
            numberOfDataPoint = 11,
            randomData = this.randomData,
            data = [];
        for (var i = 0; i < numberOfSeries; ++i)
            data.push(d3.range(numberOfDataPoint).map(function (i) {
                return {x: i, y: randomData()};
            }));
        var chart = this.scatterChart(container)
            .x(d3.scaleLinear().domain([0, 10]))
            .y(d3.scaleLinear().domain([0, 10]));
        data.forEach(function (series) {
            chart.addSeries(series);
        });
        chart.render();
        this.chart = chart;
        this.data = data;
    }

    render() {
        return (
            <div className="Dcontainer" ref={(con) => this.container = con}>
                <button onClick={this.update.bind(this)}>更新</button>
            </div>
        )
    }

    scatterChart(container) {
        var _chart = {};

        var _width = 600,
            _height = 300,
            _margins = {top: 30, left: 30, right: 30, bottom: 30},
            _x, _y,
            _data = [],
            _colors = d3.scaleOrdinal(d3.schemeCategory10),
            _svg,
            _bodyG,
            _line;
        //渲染图标
        _chart.render = function () {
            if (!_svg) {
                _svg = d3.select(container).append("svg")
                    .attr("height", _height)
                    .attr("width", _width);

                renderAxes(_svg);

                defineBodyClip(_svg);
            }

            renderBody(_svg);
        };
        //渲染坐标轴
        function renderAxes(svg) {
            var axesG = svg.append("g")
                .attr("class", "axes");

            renderXAxis(axesG);

            renderYAxis(axesG);
        }

        //x坐标轴
        function renderXAxis(axesG) {
            var xAxis = d3.axisBottom(_x.range([0, quadrantWidth()]));

            axesG.append("g")
                .attr("class", "x axis")
                .attr("transform", function () {
                    return "translate(" + xStart() + "," + yStart() + ")";
                })
                .call(xAxis);

            d3.selectAll("g.x g.tick")
                .append("line")
                .classed("grid-line", true)
                .attr("stroke", "#ccc")
                .attr("x1", 0.5)
                .attr("y1", 0.5)
                .attr("x2", 0)
                .attr("y2", -quadrantHeight());
        }

        //y坐标轴
        function renderYAxis(axesG) {
            var yAxis = d3.axisLeft(_y.range([quadrantHeight(), 0]));

            axesG.append("g")
                .attr("class", "y axis")
                .attr("transform", function () {
                    return "translate(" + xStart() + "," + yEnd() + ")";
                })
                .call(yAxis);

            d3.selectAll("g.y g.tick")
                .append("line")
                .classed("grid-line", true)
                .attr("stroke", "#ccc")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", quadrantWidth())
                .attr("y2", 0);
        }

        function defineBodyClip(svg) {
            var padding = 5;
            svg.append("defs")
                .append("clipPath")
                .attr("id", "body-clip")
                .append("rect")
                .attr("x", 0 - padding)
                .attr("y", 0)
                .attr("width", quadrantWidth() + 2 * padding)
                .attr("height", quadrantHeight());
        }

        //渲染内容
        function renderBody(svg) {
            if (!_bodyG)
                _bodyG = svg.append("g")
                    .attr("class", "body")
                    .attr("transform", "translate("
                        + xStart() + ","
                        + yEnd() + ")")
                    .attr("fill", "url(#body-clip)");
            renderSymbols();
        }

        //渲染离散点
        function renderSymbols() {
            _data.forEach(function (list, i) {
                _bodyG.selectAll("path._" + i)
                    .data(list)
                    .enter()
                    .append("path")
                    .attr("class", "symbol _" + i);

                _bodyG.selectAll("path._" + i)
                    .data(list)
                    .classed("sybol", true)
                    .transition()
                    .attr("transform", function (d) {
                        return "translate(" + _x(d.x) + "," + _y(d.y) + ")";
                    })
                    .attr("d", d3.symbol().type(d3.symbols[i]))
                    .attr("fill", _colors(i))
                    .style("opacity", "0.8")
            })


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
        _chart.addSeries = function (series) {
            _data.push(series);
            return _chart;
        };

        return _chart;
    }

    randomData() {
        return Math.random() * 9;
    }

    update() {
        var data = this.data,
            numberOfDataPoint = 11,
            chart = this.chart;
        for (var i = 0; i < data.length; ++i) {
            var series = data[i];
            series.length = 0;
            for (var j = 0; j < numberOfDataPoint; ++j)
                series.push({x: j, y: this.randomData()});
        }
        chart.render();
    }

}
export default PointChart