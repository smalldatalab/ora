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

        var data = [];

        for (var i = 0; i < 5; i++) {
            data.push(Math.random()*10);
        }

        var y = d3.scale.linear()
            .domain([0, d3.max(data)])
            .range([height, 0]);

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
            .attr("y", height);

        rects.transition()
            .duration(600)
            .delay(function(d,i) { return i*200; })
            .attr("y", function(d) { return y(d); })
            .attr("height", function(d) { return height - y(d); });
    }
});