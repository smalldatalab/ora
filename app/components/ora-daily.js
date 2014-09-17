/**
 * Created by Faisal on 8/18/2014.
 */

import Ember from "ember";
import handleResize from "../utils/d3-resizer";
/* global d3 */
/* global $ */

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['ora-daily'],
    renderChart: function(chosenDay, data) {
        var $chart = this.$("svg");
        this.width = $chart.width();
        this.height = $chart.height();

        // attach resize handler
        $(window).on("resize", handleResize($chart));

        this.chart = d3.select($chart[0]);
        var me = this;

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(x) { return x.value; })])
            .range([this.height, 0]);

        var barWidth = this.width / data.length;
        var barBase = 18;

        var bar = this.chart.selectAll("g")
                .data(data, function(d) { return d.hour; })
            .enter().append("g")
                .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

        var rects = bar.append("rect")
                .attr("width", barWidth - 3)
                .attr("height", 0)
                .attr("y", this.height - barBase)
                .attr("class", function(d) { return (d.hour >= 5 && d.hour <= 16)?"day":"night"; })
            .transition()
                .duration(400)
                .delay(function(d,i) { return (i%12)*50; })
                .attr("y", function(d) { return y(d.value) - barBase; })
                .attr("height", function(d) { return me.height - y(d.value); });

        var labels = bar.append("text")
                .attr('x', (barWidth - 3)/2)
                .attr('y', this.height)
                .attr('opacity', 0)
                .text(function(d) { return (d.hour % 12) + 1; })
            .transition()
                .duration(400)
                .delay(function(d,i) { return i*50; })
                .attr('opacity', 1);
    },
    updateChart: function(chosenDay, data) {
        var me = this;

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(x) { return x.value; })])
            .range([this.height, 0]);

        var barWidth = this.width / data.length;
        var barBase = 18;

        var bar = this.chart.selectAll("g")
                .data(data, function(d) { return d.hour; })
            .enter().append("g")
                .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

        var rects = bar.append("rect")
                .attr("width", barWidth - 3)
                .attr("height", 0)
                .attr("y", this.height - barBase)
                .attr("class", function(d) { return (d.hour >= 5 && d.hour <= 16)?"day":"night"; })
            .transition()
                .duration(400)
                .delay(function(d,i) { return (i%12)*50; })
                .attr("y", function(d) { return y(d.value) - barBase; })
                .attr("height", function(d) { return me.height - y(d.value); });

        var labels = bar.append("text")
                .attr('x', (barWidth - 3)/2)
                .attr('y', this.height)
                .attr('opacity', 0)
                .text(function(d) { return (d.hour % 12) + 1; })
            .transition()
                .duration(400)
                .delay(function(d,i) { return i*50; })
                .attr('opacity', 1);
    },
    fetchData: function(chosenDay) {
        var data = [];

        for (var i = 0; i < 24; i++) {
            data.push({
                hour: ((i + 5) % 24),
                value: Math.random()*10
            });
        }

        return data;
    },
    didInsertElement: function() {
        var date = this.get('date');
        this.renderChart(date, this.fetchData(date));
    },
    dateChanged: function() {
        var date = this.get('date');
        this.updateChart(date, this.fetchData(date));
    }.observes('date')
});