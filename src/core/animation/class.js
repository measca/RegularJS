 var animate = require("../../dom/animate.js");

module.exports = function (Regular) {
    Regular.animation('class', function( step ){
        var tmp = step.param.split(","),
        className = tmp[0] || "",
        mode = parseInt(tmp[1]) || 1;

        return function(done){
            animate.startClassAnimate( step.element, className , done, mode );
        }
    });
}