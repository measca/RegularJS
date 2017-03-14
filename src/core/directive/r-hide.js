var _ = require("../../common/util.js");
var consts = require("../../const.js");
var OPTIONS = consts.OPTIONS;
var STABLE = OPTIONS.STABLE;

module.exports = function (Regular) {
    Regular.directive('r-hide', function(elem, value){
        var preBool = null, compelete;
        if( _.isExpr(value) || typeof value === "string"){
            this.$watch(value, function(nvalue){
                var bool = !!nvalue;
                if(bool === preBool) return; 
                preBool = bool;
                if(bool){
                    if(elem.onleave){
                        compelete = elem.onleave(function(){
                            elem.style.display = "none"
                            compelete = null;
                        })
                    }else{
                        elem.style.display = "none"
                    }
                }else{
                    if(compelete) compelete();
                    elem.style.display = "";
                    if(elem.onenter){
                        elem.onenter();
                    }
                }
            }, STABLE);
        }else if(!!value){
            elem.style.display = "none";
        }
    });
}