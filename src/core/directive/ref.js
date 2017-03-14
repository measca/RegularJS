var _ = require("../../common/util.js");
var consts = require("../../const.js");
var OPTIONS = consts.OPTIONS;
var STABLE = OPTIONS.STABLE;

module.exports = function (Regular) {
    Regular.directive('ref', {
        accept: consts.COMPONENT_TYPE + consts.ELEMENT_TYPE,
        link: function( elem, value ){
            var refs = this.$refs || (this.$refs = {});
            var cval;
            if(_.isExpr(value)){
                this.$watch(value, function(nval, oval){
                    cval = nval;
                    if(refs[oval] === elem) refs[oval] = null;
                    if(cval) refs[cval] = elem;
                }, STABLE)
            }else{
                refs[cval = value] = elem;
            }
            return function(){
                refs[cval] = null;
            }
        }
    });
}