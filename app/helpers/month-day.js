/**
 * Created by Faisal on 8/20/2014.
 */

/* global d3 */

export default function(date) {
    var fmt = d3.time.format("%B %e");
    return fmt(date);
}