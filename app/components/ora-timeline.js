/**
 * Created by Faisal on 8/18/2014.
 */

import Ember from "ember";
/* global d3 */
/* global $ */

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['ora-timeline'],
    compareDates: function(a, b) {
        return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getYear() === b.getYear();
    },
    didInsertElement: function() {
        var $me = this.$();
        var meAlone = this;

        // always make our size the size of our immediate parent (e.g. the viewport?)
//        $(window).on('resize', function() {
//             $me.css('width', $(window).width());
//        });

        var height = 150;
        var barWidth = 40, barYBasis = 75, barBias = 12;

        // load up the date series from the server
        var dateTimeFormatter = d3.time.format("%Y-%m-%d");
        var data = this.get('data').map(function(d) {
            return { date: dateTimeFormatter.parse(d.date), value: d.ora };
        });

        var dayFormatter = d3.time.format("%e");
        var monthFormatter = d3.time.format("%B");

        var width = barWidth * data.length;

        var y = d3.scale.linear()
            .domain([d3.min(data, function(x) { return x.value; }), d3.max(data, function(x) { return x.value; }) + 10]) // +10 is so that we don't touch the top
            .range([height, 0]);

        var chart = d3.select(this.$("svg")[0])
            .attr("width", width)
            .attr("height", height);

        var bar = chart.selectAll("g")
                .data(data)
            .enter().append("g")
                .attr('class', function(d) { return (meAlone.compareDates(d.date, meAlone.get('date')))?"selected":""; })
                .attr("transform", function(d, i) { return "translate(" + (i * barWidth + 10) + ",0)"; })
                .on('click', function(d) {
                    if (d3.event.defaultPrevented) {
                        return;
                    }

                    // remove and reset selection
                    $(".ora-timeline g.selected").attr("class", "");
                    $(this).attr("class", 'selected');
                    $(".ora-timeline").scrollTo("g.selected", { duration: 600, offset: -($me.width()/2), easing: 'easeInOutExpo' });

                    // update the controller's date via this intermediate
                    meAlone.set('date', d.date);
                });

        function endall(transition, callback) {
            var n = 0;
            transition
                .each(function() { ++n; })
                .each("end", function() { if (!--n) { callback.apply(this, arguments); } });
        }

        var rects = bar.append("rect")
                .attr("width", barWidth - barBias)
                .attr("height", 0) // animated values
                .attr("y", height - barYBasis)
            .transition()
                .duration(400)
                .attr("y", function(d) { return y(d.value) - barYBasis; })
                .attr("height", function(d) { return height - y(d.value); })
                .call(endall, function() {
                    $(".ora-timeline").scrollTo("g.selected", { duration: 600, offset: -($me.width()/2), easing: 'easeInOutExpo' });
                });

        var label_highlight = bar.append("circle")
            .attr("r", 12)
            .attr("class", "day-highlight")
            .attr('cx', (barWidth - barBias)/2)
            .attr('cy', height - 35);

        var labels = bar.append("text")
                .attr('x', (barWidth - barBias)/2)
                .attr('y', height - 30)
                .attr('class', 'day')
                .attr('opacity', 0)
                .text(function(d) { return dayFormatter(d.date); })
            .transition()
                .duration(1000)
                .attr('opacity', 1);

        var month_labels = bar
                .filter(function(d) { return d.date.getDate() === 1; })
                .append("text")
                .attr('x', (barWidth - barBias)/2)
                .attr('y', height - 55)
                .attr('class', 'month')
                .attr('opacity', 0)
                .text(function(d) { return monthFormatter(d.date); })
            .transition()
                .duration(1000)
                .attr('opacity', 1);

        // make the timeline into a dragger
        /*
        var dragger = new Dragdealer('ora-timeline-dragger', {
            x: 0.6,
            speed: 0.3,
            loose: true,
            requestAnimationFrame: true
        });
        */
    },
    fetchData: function(chosenDay) {

    }
});