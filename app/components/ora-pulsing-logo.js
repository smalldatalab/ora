/**
 * Created by Faisal on 8/18/2014.
 */

import Ember from "ember";
import handleResize from "../utils/d3-resizer";
/* global d3 */

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['ora-pulsing-logo'],
    didInsertElement: function() {
        var $me = this.$();
        this.width = 500; this.height = 500; // from SVG viewbox property
        var _this = this;

        // set up window resizing juju
        // $(window).on("resize", handleResize(this.$("svg")));

        this.expanded = false;

        // do the initial bind
        _this.bindChart(_this.fetchRandomData());

        // setup a repeating timeout that'll constantly rebind random data
        var repeat = function() { _this.bindChart(_this.fetchRandomData()); setTimeout(repeat, 6000); };
        repeat();
    },
    bindChart: function(data) {
        var me = this;

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.value; })])
            .range([0, this.height]);

        var chart = d3.select(this.$("svg")[0]);
            /*
            .on('click', function() {
                console.log("Clicked; previously expanded?:", me.expanded);

                if (!me.expanded) {
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

                    me.expanded = true;
                }
                else {
                    // return everything to normal
                    enterSet.transition().duration(600)
                        .attr("transform", "translate(" + (me.width/2) + ", " + (me.height/2) + ")");
                    labels.transition().duration(600)
                        .attr('opacity', 0);

                    me.expanded = false;
                }
            });
            */

        // draw a circle thing
        var updateSet = chart.selectAll('g')
            .data(data);

        // update the update set first
        updateSet.select('circle')
            .transition()
            .duration(6000)
            .attr("r", function(d) { return y(d.value)/3; });

        var enterSet = updateSet.enter().append("g")
            .attr("transform", "translate(" + (me.width/2) + ", " + (me.height/2) + ")");

        var circles = enterSet.append("circle")
            .attr('fill', 'rgba(255, 255, 255, 0.5)')
            .attr("r", function(d) { return y(d.value)/3; });

        var labels = enterSet.append("text")
            .attr('y', me.height/2-10)
            .attr('opacity', 0)
            .text(function(d) { return d.type; });
    },
    fetchRandomData: function() {
        return [
            { type: 'yesterday', value: Math.random() * 60 + 5 },
            { type: 'today', value: Math.random() * 60 + 5 },
            { type: 'baseline', value: Math.random() * 60 + 5 }
        ];
    },
    dateChanged: function() {
        var date = this.get('date');
        this.bindChart(date, this.fetchRandomData(date));
    }.observes('date')
});