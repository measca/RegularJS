var animate = require("../../dom/animate.js");

var rSpace = /\s+/;

module.exports = function (Regular) {
    Regular.animation('style', function(step){
        var styles = {}, 
          param = step.param,
          pairs = param.split(","), valid;
        pairs.forEach(function(pair){
            pair = pair.trim();
            if(pair){
                var tmp = pair.split( rSpace ),
                  name = tmp.shift(),
                  value = tmp.join(" ");

                if( !name || !value ) throw Error("invalid style in command: style");
                styles[name] = value;
                valid = true;
            }
        })

        return function(done){
            if(valid){
                animate.startStyleAnimate(step.element, styles, done);
            }else{
                done();
            }
        }
    });
}