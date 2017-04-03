// (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org

// klass: a classical JS OOP façade
// https://github.com/ded/klass
// License MIT (c) Dustin Diaz 2014
  
// inspired by backbone's extend and klass
var _ = require("../util.js"),
  fnTest = /xy/.test(function(){"xy";}) ? /\bsupr\b/:/.*/,
  isFn = function(o){return typeof o === "function"};

var hooks = {
  events: function( propertyValue, proto ){
    var eventListeners = proto._eventListeners || [];
    var normedEvents = _.normListener(propertyValue);

    if(normedEvents.length) {
      proto._eventListeners = eventListeners.concat( normedEvents );
    }
    delete proto.events ;
  },
  components: function( propertyValue, proto ) {
    for (var key in propertyValue) {
      if(!propertyValue[key]) continue;
      if(typeof propertyValue[key] == 'function') {
        proto.constructor.component(key, propertyValue[key]);
      } else {
        var component = proto.RegularRootClass.extend(propertyValue[key]);
        proto.constructor.component(key, component);
      }
    }
    delete proto.components ;
  },
  directives: function( propertyValue, proto ) {
    proto.constructor.directive(propertyValue);
    delete proto.directives ;
  },
  filters: function( propertyValue, proto ) {
    proto.constructor.filter(propertyValue);
    delete proto.filters ;
  },
  animations: function( propertyValue, proto ) {
    proto.constructor.animation(propertyValue);
    delete proto.animations ;
  },
  watchs: function (propertyValue, proto) {
    proto.$on("$config", function() {
      for (var key in propertyValue) {
        if(!propertyValue[key]) continue;
        this.$watch(key, propertyValue[key]);
      }
    });
    delete proto.watchs ;
  }
}


function wrap( k, fn, supro ) {
  return function () {
    var tmp = this.supr;
    this.supr = supro[k];
    var ret = fn.apply(this, arguments);
    this.supr = tmp;
    return ret;
  }
}

function process( what, o, supro ) {
  for ( var k in o ) {
    if (o.hasOwnProperty(k)) {
      if(hooks[k]) {
        hooks[k](o[k], what, supro)
      }
      what[k] = isFn( o[k] ) && isFn( supro[k] ) && 
        fnTest.test( o[k] ) ? wrap(k, o[k], supro) : o[k];
    }
  }
}

// if the property is ["events", "data", "computed"] , we should merge them
var merged = ["data", "computed"], mlen = merged.length;
module.exports = function extend(o){
  o = o || {};
  var supr = this, proto,
    supro = supr && supr.prototype || {};

  if(typeof o === 'function'){
    proto = o.prototype;
    o.implement = implement;
    o.extend = extend;
    proto.RegularRootClass = o;
    return o;
  } 
  
  function fn() {
    supr.apply(this, arguments);
  }

  proto = _.createProto(fn, supro);

  function implement(o){
    // we need merge the merged property
    var len = mlen;
    for(;len--;){
      var prop = merged[len];
      if(proto[prop] && o.hasOwnProperty(prop) && proto.hasOwnProperty(prop)){
        _.extendDepth(proto[prop], o[prop], true) 
        delete o[prop];
      }
    }


    process(proto, o, supro); 
    return this;
  }


  if(supr.__after__) supr.__after__.call(fn, supr, o);

  fn.extend = extend;

  fn.implement = implement
  fn.implement(o)

  return fn;
}

