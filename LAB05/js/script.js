import * as d3 from './d3.js';

var margin = {
    top: 10,
    right: 30,
    bottom: 30,
    left: 60,
};
var width = 1000 - margin.left - margin.right;
var height = 900 - margin.top - margin.bottom;

// setup x axis
var xValue = function (d) {
    return d.long;
};
var xScale = d3.scaleLinear().range([0, width]);
var xMap = function (d) {
    return xScale(xValue(d));
};
var xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y axis
var yValue = function (d) {
    return +d.lat;
};
var yScale = d3.scaleLinear().range([height, 0]);
var yMap = function (d) {
    return yScale(yValue(d));
};
var yAxis = d3.svg.axis().scale(yScale).orient("left");

// color opacity for the dots
var cValue = function (d) {
        return d.case;
    },
    color = d3.scale
        .linear()
        .domain([1, 500000])
        .range(["rgba(1000,0,0,0)", "rgba(1000,0,0,10)"]);

// Encode the attributes
var rowConverter = function (d) {
    return {
        "Province/State": d["province"],
        "Country/Region": d["country"],
        Lat: parseFloat(d.lat),
        Long: parseFloat(d.long),
        case: parseInt(d["5/4/20"]),
    };
};

// main scatterplot section
var scatterplot = d3
    .select("#scatterplot")
    .append("div")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// setup the tooltip
var tooltip = d3.select("body").append("div").attr("class", "tooltip");

// Read the data
d3.csv(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv",
    rowConverter,
    function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.log(data);

            xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
            yScale.domain([
                d3.min(data, yValue) - 20,
                d3.max(data, yValue) + 1,
            ]);

            // x-axis
            scatterplot
                .append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .append("text")
                .attr("class", "label")
                .attr("x", width)
                .attr("y", -6)
                .style("text-anchor", "end")
                .text("Longitude");

            // y-axis
            scatterplot
                .append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("class", "label")
                .attr("transform", "rotate(-90)")
                .attr("y", 5)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Latitude");

            // add dots
            var dot = scatterplot
                .selectAll(".dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "dot")
                .attr("r", 6)
                .attr("cx", xMap)
                .attr("cy", yMap)
                .style("fill", function (d) {
                    return color(cValue(d));
                })
                .on("mouseover", function (d) {
                    tooltip
                        .transition()
                        .duration(100)
                        .style("text-anchor", "end")
                        .style("opacity", 100);

                    tooltip.html(
                        "Country: " +
                            d.country +
                            "<br/> (" +
                            d.lat +
                            ", " +
                            d.long +
                            ")" +
                            "<br/> Confirmed cases: " +
                            d.case +
                            ")"
                    )
                        .style("left", d3.event.pageX + 5 +"px")
                        .style("top", d3.event.pageY - 30 + "px");    
                })

                .on("mouseout", function(d) {
                    tooltip.transition().duration(200).style("opacity", 0);
                });

            scatterplot.call(d3.svg.brush().extent([[0, 0], [width, height],])
                .on("start brush", updateChart));

            function updateChart() {
                extent = d3.event.selection;
                dot.classed("selected", function(d) {
                    return isBrushed(extent, x(d.long), y(d.lat));
                });
            }

            function isBrushed(brush_coords, cx, cy) {
                var x0 = brush_coords[0][0],
                    x1 = brush_coords[1][0],
                    y0 = brush_coords[0][1],
                    y1 = brush_coords[1][1];
                return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
            }
        }
    }
);
