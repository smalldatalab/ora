/**
 * Created by Faisal on 8/18/2014.
 */

import Ember from "ember";

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['ora-daily'],
    renderChart: function() {
        var $me = this.$().find(".daily-wrapper");
        var width = $me.width(),
            height = 100;
        var barBase = 18;

        // create 24 bars partitioned into day and night
        var data = [];

        for (var i = 0; i < 24; i++) {
            data.push({
                hour: ((i+5) % 24),
                value: Math.random()*10
            });
        }

        var y = d3.scale.linear()
                .domain([0, d3.max(data, function(x) { return x.value; })])
                .range([height, 0]);

        var chart = d3.select('#' + this.$()[0].getAttribute('id') + " svg")
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
                .attr("y", height - barBase)
                .attr("class", function(d) { return (d.hour >= 5 && d.hour <= 16)?"day":"night"; });

        var labels = bar.append("text")
                .attr('x', 3)
                .attr('y', height)
                .attr('opacity', 0)
                .attr('dx', '.35em')
                .text(function(d) { return (d.hour % 12) + 1; })
            .transition()
                .duration(400)
                .delay(function(d,i) { return i*50; })
                .attr('opacity', 1);

        rects.transition()
                .duration(400)
                .delay(function(d,i) { return (i%12)*50; })
                .attr("y", function(d) { return y(d.value) - barBase; })
                .attr("height", function(d) { return height - y(d.value); });
    }.on('didInsertElement')
});