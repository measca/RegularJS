module.exports = function (Regular) {
    Regular.animation('emit', function(step){
        var param = step.param;
        var tmp = param.split(",");
        var evt = tmp[0] || "";
        var args = tmp[1]? this.$expression(tmp[1]).get: null;

        if(!evt) throw Error("you shoud specified a eventname in emit command");

        var self = this;
        return function(done){
            self.$emit(evt, args? args(self) : undefined);
            done();
        }
    });
}