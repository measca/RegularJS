var _ = require("../../common/util.js");
var consts = require("../../const.js");
var dom = require("../../dom/dom.js");
var namespaces = consts.NAMESPACE;
var OPTIONS = consts.OPTIONS;
var DEEP_STABLE = OPTIONS.DEEP_STABLE;

module.exports = function (Regular) {
    Regular.directive('r-class', function(elem, value){
        if(typeof value=== 'string'){
            value = _.fixObjStr(value)
        }
        var isNotHtml = elem.namespaceURI && elem.namespaceURI !== namespaces.html ;
        this.$watch(value, function(nvalue) {
            var className = isNotHtml? elem.getAttribute('class'): elem.className;
            className = ' ' + (className||'').replace(/\s+/g, ' ') +' ';
            for(var i in nvalue) if(nvalue.hasOwnProperty(i)){
                className = className.replace(' ' + i + ' ',' ');
                if(nvalue[i] === true){
                    className += i+' ';
                }
            }
            className = className.trim();
            if(isNotHtml){
                dom.attr(elem, 'class', className)
            }else{
                elem.className = className
            }
        }, DEEP_STABLE);
    });
}