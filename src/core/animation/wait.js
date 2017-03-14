module.exports = function (Regular) {
    Regular.animation('wait', function( step ){
        var timeout = parseInt( step.param ) || 0
        return function(done){
            setTimeout( done, timeout);
        }
    });
}