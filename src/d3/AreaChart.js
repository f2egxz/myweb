import React, {Component} from 'react';
import * as d3 from 'd3';
import './d3.css';


class AreaChart extends Component {
    componentDidMount(){
        var container = this.container

        var numberOfSeries = 3,
            numberOfDataPoint = 11,
            randomData = this.randomData,
            data = [];
        for (var i = 0; i < numberOfSeries; ++i)
            data.push(d3.range(numberOfDataPoint).map(function (i) {
                return {x: i, y: randomData()};
            }));
        var chart = this.areaChart(container)
            .x(d3.scaleLinear().domain([0, 10]))
            .y(d3.scaleLinear().domain([0, 10]));
        data.forEach(function (series) {
            chart.addSeries(series);
        });
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

    areaChart(container) {
    var _chart = {};

    var _width = 600,
        _height = 300,
        _margins= {top: 30, left: 30, right: 30, bottom: 30},
        _x, _y,
        _data = [],
        _colors = d3.scaleOrdinal(d3.schemeCategory10),
        _svg,
        _bodyG,
        _line;
    //渲染图表
    _chart.render = function() {
        if(!_svg) {
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
    function renderXAxis(axesG){
        var xAxis = d3.axisBottom(_x.range([0, quadrantWidth()]));

        axesG.append("g")
            .attr("class", "x axis")
            .attr("transform", function() {
                return "translate("+xStart()+","+ yStart()+")";
            })
            .call(xAxis);

        d3.selectAll("g.x g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("stroke", "#ccc")
            .attr("x1", 0.5)
            .attr("y1", 0.5)
            .attr("x2", 0)
            .attr("y2", - quadrantHeight());
    }
    //y坐标轴
    function renderYAxis(axesG){
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
    //模板 渲染位置
    function defineBodyClip(svg) {
        var padding = 5;
        svg.append("defs")
            .append("clipPath")
            .attr("id", "body-clip")
            .append("rect")
            .attr("x", 0 - padding)
            .attr("y", 0)
            .attr("width", quadrantWidth() + 2 * padding)
            .attr("height", quadrantHeight())
    }
    //渲染内容
    function renderBody(svg) {
        if(!_bodyG)
            _bodyG = svg.append("g")
                .attr("class", "body")
                .attr("transform", "translate("
                    + xStart() + ","
                    + yEnd() + ")")
                .attr("clip-path", "url(#body-clip)");

        renderLines();
        renderAreas();
        renderDots();
    }
    //渲染数据 线
    function renderLines() {
        _line = d3.line()
            .x(function(d) { return _x(d.x); })
            .y(function(d) { return _y(d.y); });

        _bodyG.selectAll("path.line")
            .data(_data)
            .enter()
            .append("path")
            .attr("stroke",function(d, i){
                return _colors(i)
            })
            .attr("fill", "transparent")
            .attr("class", "line");

        _bodyG.selectAll("path.line")
            .data(_data)
            .transition()
            .attr("d", function (d) { return _line(d); });
    }
    //渲染面积
    function renderAreas() {
        var area = d3.area()
            .x(function(d){ return _x(d.x) })
            .y0(yStart() )
            .y1(function(d){ return _y(d.y) })

        _bodyG.selectAll("path.area")
            .data(_data)
            .enter()
            .append("path")
            .attr("fill", function(d, i){
                return _colors(i)
            })
            .attr("class", "area");

        _bodyG.selectAll("path.area")
            .data(_data)
            .transition()
            .attr("d", function(d){ return area(d); })
            .style("opacity", "0.3")

    }

    //渲染坐标点
    function renderDots() {
        _data.forEach(function(list, i) {
            _bodyG.selectAll("circle.dot_"+ i)
                .data(list)
                .enter()
                .append("circle")
                .attr("class", "dot_" + i)

            _bodyG.selectAll("circle.dot_"+ i)
                .data(list)
                .attr("fill", "white")
                .attr("stroke", function (d) {
                    return _colors(i);
                })
                .transition()
                .attr("cx", function(d) { return _x(d.x); })
                .attr("cy", function(d) { return _y(d.y); })
                .attr("r", 4.5);
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
        var numberOfDataPoint = 11,
            data = this.data;
        for (var i = 0; i < data.length; ++i) {
            var series = data[i];
            series.length = 0;
            for (var j = 0; j < numberOfDataPoint; ++j)
                series.push({x: j, y: this.randomData()});
        }
        this.chart.render();
    }
}

export default AreaChart