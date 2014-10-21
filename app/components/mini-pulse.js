/**
 * Created by Faisal on 8/18/2014.
 */

import Ember from "ember";
/* global d3 */

export default Ember.Component.extend({
    classNames: ['mini-pulse'],
    didInsertElement: function() {
        var $me = this.$();

        var width = $me.width(),
            height = $me.height();
        var marginBottom = 15; // space for labels

        var data = this.get('data');

        var y = d3.scale.linear()
            .domain([d3.min(data, function(d) { return d.ora; }), d3.max(data, function(d) { return d.ora; })])
            .range([height-20, 10]);

        var chart = d3.select('#' + this.$()[0].getAttribute('id') + " > svg")
            .attr("width", width)
            .attr("height", height);

        var barWidth = width / data.length;

        var bar = chart.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

        var rects = bar.append("rect")
            .attr("width", barWidth - 3)
            .attr("height", 0)
            .attr("y", height - marginBottom);

        var dowFormatter = d3.time.format("%a");
        var dateTimeFormatter = d3.time.format("%Y-%m-%d");
        // var dowLookup = {0:"U", 1:"M", 2:"T", 3:"W", 4:"R", 5:"F", 6:"S"};
        var labels = bar.append('text')
                .attr('x', barWidth/2)
                .attr('y', height)
                .attr('class', 'dayofweek')
                .text(function(d) { return dowFormatter(dateTimeFormatter.parse(d.date)); })
            .transition()
                .duration(1000)
                .attr('opacity', 1);

        rects.transition()
            .duration(600)
            .delay(function(d,i) { return i*200; })
            .attr("y", function(d) { return y(d.ora) - marginBottom; })
            .attr("height", function(d) { return height - y(d.ora); });
    }
});