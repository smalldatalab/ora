/**
 * Created by Faisal on 8/18/2014.
 */

import Ember from "ember";

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['ora-timeline'],
    renderChart: function() {
        // make the timeline into a dragger
        var $me = this.$();
        var myID = '#' + this.$()[0].getAttribute('id');

        new Dragdealer(myID + ' .dragdealer');

        var height = 150;

        // create a huge series of bars
        var barBase = 18;

        // create 24 bars partitioned into day and night
        var data = [];

        for (var i = 0; i < 24; i++) {
            data.push({
                day: ((i+1) % 31),
                value: Math.random()*10
            });
        }

        var barWidth = 30;
        var width = barWidth * data.length;

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(x) { return x.value; })])
            .range([height, 0]);

        var chart = d3.select('#' + this.$()[0].getAttribute('id') + " svg")
            .attr("width", width)
            .attr("height", height);

        var bar = chart.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

        var rects = bar.append("rect")
            .attr("width", barWidth - 3)
            .attr("height", 0)
            .attr("y", height - barBase)
            .attr("class", function(d) { return (d.hour >= 5 && d.hour <= 16)?"day":"night"; });

//        var labels = bar.append("text")
//            .attr('x', 3)
//            .attr('y', height)
//            .attr('opacity', 0)
//            .attr('dx', '.35em')
//            .text(function(d) { return (d.hour % 12) + 1; })
//            .transition()
//            .duration(400)
//            .delay(function(d,i) { return i*50; })
//            .attr('opacity', 1);

        rects.transition()
            .duration(400)
            .delay(function(d,i) { return (i%12)*50; })
            .attr("y", function(d) { return y(d.value) - barBase; })
            .attr("height", function(d) { return height - y(d.value); });
    }.on('didInsertElement')
});