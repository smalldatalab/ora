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
        this.width = this.$("svg").width();
        this.height = this.$("svg").height();

        // set up window resizing juju
        // $(window).on("resize", handleResize(this.$("svg")));

        var chosenDate = this.get('date');
        this.bindChart(chosenDate, this.fetchData(chosenDate));
    },
    bindChart: function(choseDay, data) {
        var me = this;

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.value; })])
            .range([0, this.height]);

        var expanded = false;
        var chart = d3.select(this.$("svg")[0])
            .on('click', function() {
                if (!expanded) {
                    // separate the groups when mousing over and show helpers
                    chart.selectAll('g').transition()
                        .duration(1000)
                        .attr("transform", function (d, i) {
                            var x = (i - (data.length - 1) / 2) * me.height / 1.5;
                            return "translate(" + (x + me.width / 2) + ", " + (me.height / 2) + ")";
                        });
                    chart.selectAll('g text').transition()
                        .duration(600)
                        .delay(1000)
                        .attr('opacity', 1);

                    expanded = true;
                }
                else {
                    // return everything to normal
                    enterSet.transition().duration(600)
                        .attr("transform", "translate(" + (me.width/2) + ", " + (me.height/2) + ")");
                    labels.transition().duration(600)
                        .attr('opacity', 0);

                    expanded = false;
                }
            });

        // draw a circle thing
        var updateSet = chart.selectAll('g')
            .data(data);

        // update the update set first
        updateSet.select('circle')
            .transition()
            .delay(400)
            .duration(800)
            .attr("r", function(d) { return y(d.value)/3; });

        var enterSet = updateSet.enter().append("g")
            .attr("transform", "translate(" + (me.width/2) + ", " + (me.height/2) + ")");

        var circles = enterSet.append("circle")
            .attr('fill', 'rgba(255, 255, 255, 0.5)')
            .attr("r", function(d) { return y(d.value)/3; });

        var labels = enterSet.append("text")
            .attr('y', me.height/2-10)
            .attr('opacity', 0)
            .text(function(d) { return d.type });
    },
    fetchData: function(chosenDay) {
        return [
            { type: 'yesterday', value: Math.random() * 30 + 5 },
            { type: 'today', value: Math.random() * 30 + 5 },
            { type: 'baseline', value: Math.random() * 30 + 5 }
        ];
    },
    dateChanged: function() {
        var date = this.get('date');
        this.bindChart(date, this.fetchData(date));
    }.observes('date')
});