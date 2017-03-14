var _ = require("../../common/util.js");
var dom = require("../../dom/dom.js");
var consts = require("../../const.js");
var OPTIONS = consts.OPTIONS;
var DEEP_STABLE = OPTIONS.DEEP_STABLE;

module.exports = function (Regular) {
    Regular.directive('r-style', function(elem, value){
        if(typeof value === 'string'){
            value = _.fixObjStr(value)
        }
        this.$watch(value, function(nvalue){
            for(var i in nvalue) 
                if(nvalue.hasOwnProperty(i)){
                    dom.css(elem, i, nvalue[i]);
                }
        }, DEEP_STABLE);
    });
}