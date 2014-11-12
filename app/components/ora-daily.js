/**
 * Created by Faisal on 8/18/2014.
 */

import Ember from "ember";
import handleResize from "../utils/d3-resizer";
/* global d3 */

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['ora-daily'],
    hourMapping: d3.range(0,23).map(function(i) { return (i+5)%24; }),
    didInsertElement: function() {
        var date = this.get('date');
        var _this = this;

        var $chart = this.$("svg");
        this.width = $chart.width();
        this.height = $chart.height();

        // attach resize handler
        $chart.addClass('wants-resize').on('resize_respond', handleResize($chart));

        this.chart = d3.select($chart[0]);
        this.fetchData(date).then(function(data) {
            console.log(data);
            _this.bindChart(date, data);
        });
    },
    bindChart: function(chosenDay, data) {
        var me = this;

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(x) { return x.value; })])
            .range([this.height, 0]);

        var barWidth = this.width / data.length;
        var barBase = 18;

        var updateSet = this.chart.selectAll("g")
            .data(data, function(d) { return d.hour; });

        // update the existing bars
        updateSet.select('rect')
            .transition()
                .duration(600)
                .attr("y", function(d) { return y(d.value) - barBase; })
                .attr("height", function(d) { return me.height - y(d.value); });

        var enterSet = updateSet.enter().append("g")
            .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

        var rects = enterSet.append("rect")
                .attr("width", barWidth - 3)
                .attr("height", 0)
                .attr("y", this.height - barBase)
                .attr("class", function(d) { return (d.hour >= 5 && d.hour <= 16)?"day":"night"; })
            .transition()
                .duration(400)
                .delay(function(d,i) { return (i%12)*50; })
                .attr("y", function(d) { return y(d.value) - barBase; })
                .attr("height", function(d) { return me.height - y(d.value); });

        var labels = enterSet.append("text")
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
        // retrieve all kinds of state to get ready for our request for more data
        var user = this.get('user');
        var isoFormatter = d3.time.format("%Y-%m-%d");
        var _this = this;

        console.log("About to fetch data for: http://lifestreams.smalldata.io/ora/hourly/" + user.uid + "/" + isoFormatter(chosenDay));

        return Ember.$.getJSON("http://lifestreams.smalldata.io/ora/hourly/" + user.uid + "/" + isoFormatter(chosenDay)).then(function(data) {
            // transform data into what the visualization is expecting
            return _this.hourMapping.map(function(i) { return {hour: i, value: data[i]}});
        });

        /*
        return new Ember.RSVP.Promise(function(resolve, reject) {
            // create randomized data for the demo
            var data = [];

            for (var i = 0; i < 24; i++) {
                data.push({
                    hour: ((i + 5) % 24),
                    value: Math.random()*10
                });
            }

            resolve(data);
        });
        */
    },
    dateChanged: function() {
        var date = this.get('date');
        var _this = this;
        this.fetchData(date).then(function(data) {
            console.log(data);
            _this.bindChart(date, data);
        });
    }.observes('date')
});