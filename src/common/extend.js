// (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org

// klass: a classical JS OOP façade
// https://github.com/ded/klass
// License MIT (c) Dustin Diaz 2014
  
// inspired by backbone's extend and klass
var _ = require("./util.js"),
  fnTest = /xy/.test(function(){"xy";}) ? /\bsupr\b/:/.*/,
  isFn = function(o){return typeof o === "function"};

var hooks = {
  // 主要将data里面的 events 跟 将要new的对象（可以认为是 regular）进行合并
  events: function( propertyValue, proto ){
    var eventListeners = proto._eventListeners || [];
    var normedEvents = _.normListener(propertyValue);

    if(normedEvents.length) {
      proto._eventListeners = eventListeners.concat( normedEvents );
    }
    delete proto.events ;
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

// what 是 fn o 是data supro 是父的属性
function process( what, o, supro ) {
  for ( var k in o ) {
    if (o.hasOwnProperty(k)) {
      if(hooks[k]) {
        hooks[k](o[k], what, supro)
      }

      // 主要功能能够在 方法里面通过 supr 方法 访问父类的方法
      what[k] = isFn( o[k] ) && isFn( supro[k] ) && 
        fnTest.test( o[k] ) ? wrap(k, o[k], supro) : o[k];
    }
  }
}

// if the property is ["events", "data", "computed"] , we should merge them
var merged = ["data", "computed"], mlen = merged.length;

// 给某个对象扩展属性
module.exports = function extend(o){
  o = o || {};
  var supr = this, proto;
  var supro = (supr.prototype || {});

  if(typeof o === 'function'){
    proto = o.prototype;
    o.implement = implement;
    o.extend = extend;
    return o;
  } 
  
  function fn() {
    supr.apply(this, arguments);  //  在new fn的时候同时把 他的父类属性也同时带上
  }

  // 在fn 上赋值 上  constructor = fn 和 supro ,在new的时候可获得  返回 fn
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



  fn.implement = implement
  fn.implement(o)

  // 这里主要初始化 template 以及 将supr 里面的 directive 、use 、 component 、 以及 filter 绑定到 fn
  if(supr.__after__) supr.__after__.call(fn, supr, o);
  fn.extend = extend;
  return fn;
}

