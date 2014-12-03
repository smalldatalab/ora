/**
 * Created by Faisal on 8/28/2014.
 */

function handleResize($thisChart) {
    // set up window resizing juju
    var aspect = $thisChart.width() / $thisChart.height();
    console.log("Original dimensions of", $thisChart.parent().attr('class'), " svg: " + $thisChart.width() + "x" + $thisChart.height());

    $thisChart.on('resize', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    return function(event) {
        var targetWidth = $thisChart.parent().width();
        $thisChart.attr("width", targetWidth);
        $thisChart.attr("height", targetWidth / aspect);

        console.log(event);
        console.log("-= Resize to target", targetWidth, "of ", $thisChart.parent().attr('class'), " complete: " + $thisChart.attr('width') + "x" + $thisChart.attr('height'));
    };
}

export default handleResize;