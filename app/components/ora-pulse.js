/**
 * Created by Faisal on 8/18/2014.
 */

import Ember from "ember";

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['ora-pulse'],
    renderChart: function() {
        var $me = this.$();
        var width = $me.width(),
            height = $me.height();

        var initialDelay = 1000; // delay before circles readjust

        var data = [];
        for (var i = 0; i < 3; i++)
            data.push(Math.random()*30 + 5);

        var y = d3.scale.linear()
            .domain([0, d3.max(data)])
            .range([0, width]);

        var chart = d3.select('#' + this.$()[0].getAttribute('id') + " > svg")
            .attr("width", width)
            .attr("height", height);

        // draw a circle thing
        var groups = chart.selectAll('g')
                .data(data)
            .enter().append("g")
                .attr("transform", function(d, i) { return "translate(" + (width/2) + ", " + (height/2) + ")"; });

        var circles = groups.append("circle")
                .attr('fill', 'rgba(255, 255, 255, 0.5)')
                .attr("r", function(d) { return y(d)/2; });

        circles.transition()
            .duration(3000)
            .delay(function(d,i){ return i*200 + initialDelay; })
            .attr('r', function(d, i) { return ((i+1)/data.length) * width/2; });
    }.on('didInsertElement')
});