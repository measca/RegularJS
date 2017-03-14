var _ = require('./util');

exports.svg = (function(){
    return document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1" );
})();

exports.browser = document.nodeType;

exports.exprCache = _.cache(1000);

exports.isRunning = false;