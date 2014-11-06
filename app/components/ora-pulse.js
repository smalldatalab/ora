/**
 * Created by Faisal on 8/18/2014.
 */

import Ember from "ember";
import handleResize from "../utils/d3-resizer";
/* global d3 */

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['ora-pulse'],
    didInsertElement: function() {
        var $me = this.$();
        this.width = this.$("svg").width();
        this.height = this.$("svg").height();

        this.expanded = false;

        // set up window resizing juju
        $me.addClass('wants-resize').on('resize_respond', handleResize(this.$("svg")));

        var chosenDate = this.get('date');
        this.bindChart(chosenDate, this.fetchData(chosenDate));
    },
    bindChart: function(choseDay, data) {
        var _this = this;

        /*
        var y = d3.scale.linear()
            .domain([d3.min(data, function(d) { return d.value; }), d3.max(data, function(d) { return d.value; })])
            .range([0, this.height]);
        */
        var y = d3.scale.sqrt()
            .domain([this.minv, this.maxv])
            .range([0, this.height]);

        var chart = d3.select(this.$("svg")[0])
            .on('click', function() {
                if (!_this.expanded) {
                    // separate the groups when mousing over and show helpers
                    chart.selectAll('g').transition()
                        .duration(1000)
                        .attr("transform", function (d, i) {
                            var x = (i - (data.length - 1) / 2) * _this.height / 1.5;
                            return "translate(" + (x + _this.width / 2) + ", " + (_this.height / 2) + ")";
                        });
                    chart.selectAll('g text').transition()
                        .duration(600)
                        .delay(1000)
                        .attr('opacity', 1);

                    _this.expanded = true;
                }
                else {
                    // return everything to normal
                    chart.selectAll('g').transition().duration(600)
                        .attr("transform", "translate(" + (_this.width/2) + ", " + (_this.height/2) + ")");
                    chart.selectAll('g text').transition().duration(600)
                        .attr('opacity', 0);

                    _this.expanded = false;
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
            .attr("transform", "translate(" + (_this.width/2) + ", " + (_this.height/2) + ")");

        var circles = enterSet.append("circle")
            .attr('fill', 'rgba(255, 255, 255, 0.5)')
            .attr('class', function(d) { return d.type; })
            .attr("r", function(d) { return y(d.value)/3; });

        var labels = enterSet.append("text")
            .attr('y', _this.height/2-10)
            .attr('opacity', 0)
            .text(function(d) { return d.type; });
    },
    fetchData: function(chosenDay) {
        var data = this.get('data');

        // get the min and max from the array to construct the pulse ranges
        this.minv = d3.min(data, function(d) { return d.ora; });
        this.maxv = d3.max(data, function(d) { return d.ora; });

        // find today's date's index in the array
        var format = d3.time.format("%Y-%m-%d");
        var today = format(chosenDay);
        var today_idx = -1;
        Ember.$.each(data, function(i, elem) {
            if (data[i].date == today)
                today_idx = i;
        });

        if (today_idx >= 0) {
            return [
                { type: 'yesterday', value: (today_idx > 0)?(data[today_idx-1].ora):0 },
                { type: 'today', value: data[today_idx].ora },
                { type: 'tomorrow', value: (today_idx < data.length-1)?(data[today_idx+1].ora):0 }
            ];
        }
        else {
            throw "Could not find chosen date in data!";
        }
    },
    dateChanged: function() {
        var date = this.get('date');
        this.bindChart(date, this.fetchData(date));
    }.observes('date')
});