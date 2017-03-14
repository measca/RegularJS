module.exports = function (Regular) {
    Regular.animation('call', function(step){
        var fn = this.$expression(step.param).get, self = this;
        return function(done){
            fn(self);
            self.$update();
            done()
        }
    });
}