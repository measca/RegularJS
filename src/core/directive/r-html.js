var _ = require("../../common/util.js");
var consts = require("../../const.js");
var dom = require("../../dom/dom.js");
var OPTIONS = consts.OPTIONS;
var FORCE_STABLE = OPTIONS.FORCE_STABLE;

module.exports = function (Regular) {
    Regular.directive('r-html', function(elem, value){
        this.$watch(value, function(nvalue){
            nvalue = nvalue || "";
            dom.html(elem, nvalue)
        }, FORCE_STABLE);
    });
}