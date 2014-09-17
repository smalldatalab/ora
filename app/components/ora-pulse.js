/**
 * Created by Faisal on 8/18/2014.
 */

import Ember from "ember";
import handleResize from "../utils/d3-resizer";
/* global d3 */
/* global $ */

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['ora-pulse'],
    didInsertElement: function() {
        var $me = this.$();
        var width = this.$("svg").width(),
            height = this.$("svg").height();

        // set up window resizing juju
        $(window).on("resize", handleResize(this.$("svg")));

        var data = [
            { type: 'yesterday', value: Math.random() * 30 + 5 },
            { type: 'today', value: Math.random() * 30 + 5 },
            { type: 'baseline', value: Math.random() * 30 + 5 }
        ];

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.value; })])
            .range([0, height]);

        var expanded = false;
        var chart = d3.select(this.$("svg")[0])
            .on('click', function() {
                if (!expanded) {
                    // separate the groups when mousing over and show helpers
                    groups.transition()
                        .duration(1000)
                        .attr("transform", function (d, i) {
                            var x = (i - (data.length - 1) / 2) * height / 1.5;
                            return "translate(" + (x + width / 2) + ", " + (height / 2) + ")";
                        });
                    labels.transition()
                        .duration(600)
                        .delay(1000)
                        .attr('opacity', 1);

                    expanded = true;
                }
                else {
                    // return everything to normal
                    groups.transition().duration(600)
                        .attr("transform", "translate(" + (width/2) + ", " + (height/2) + ")");
                    labels.transition().duration(600)
                        .attr('opacity', 0);

                    expanded = false;
                }
            });

        // draw a circle thing
        var groups = chart.selectAll('g')
                .data(data)
            .enter().append("g")
                .attr("transform", "translate(" + (width/2) + ", " + (height/2) + ")");

        var circles = groups.append("circle")
                .attr('fill', 'rgba(255, 255, 255, 0.5)')
                .attr("r", function(d) { return y(d.value)/3; });
//                .attr('r', function(d, i) { return ((i+1)/data.length) * height/3; })
//            .transition().duration(3000).delay(function(d,i){ return i*200 + initialDelay; })
//                .attr("r", function(d) { return y(d.value)/3; });

        var labels = groups.append("text")
            .attr('y', height/2-10)
            .attr('opacity', 0)
            .text(function(d) { return d.type });
    }
});