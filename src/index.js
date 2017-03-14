require('./es5-shim/shim.js');

var Regular = module.exports = require("./regular.js");

Regular._addProtoInheritCache("event");
Regular._addProtoInheritCache("animation");
Regular._addProtoInheritCache("component");
Regular._addProtoInheritCache("filter", function(cfg){
    return typeof cfg === "function"? {get: cfg}: cfg;
});

Regular.use(require("./core/animation/call.js"));
Regular.use(require("./core/animation/class.js"));
Regular.use(require("./core/animation/emit.js"));
Regular.use(require("./core/animation/style.js"));
Regular.use(require("./core/animation/wait.js"));

Regular.use(require("./core/directive/animation.js"));
Regular.use(require("./core/directive/delegate.js"));
Regular.use(require("./core/directive/on.js"));
Regular.use(require("./core/directive/r-class.js"));
Regular.use(require("./core/directive/r-hide.js"));
Regular.use(require("./core/directive/r-html.js"));
Regular.use(require("./core/directive/r-model.js"));
Regular.use(require("./core/directive/r-style.js"));
Regular.use(require("./core/directive/ref.js"));

Regular.use(require("./core/filter/average.js"));
Regular.use(require("./core/filter/json.js"));
Regular.use(require("./core/filter/last.js"));
Regular.use(require("./core/filter/total.js"));

Regular.use(require("./core/plugin/timeout.js"));