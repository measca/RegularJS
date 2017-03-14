var exprCache = require('../common/env.js').exprCache;
var _ = require("../common/util.js");
var Parser = require("../parser/parser.js");
module.exports = {
    expression: function(expr, simple){
        // @TODO cache
        if( typeof expr === 'string' && ( expr = expr.trim() ) ){
            expr = exprCache.get( expr ) || exprCache.set( expr, new Parser( expr, { mode: 2, expression: true } ).expression() )
        }
        if(expr) return expr;
    },
    parse: function(template){
        return new Parser(template).parse();
    }
}