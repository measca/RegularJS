var _ = require('../common/util.js');
var combine = require('./combine.js')

function Group(list){
    this.children = list || [];
}

Group.prototype = {
    destroy: function(first){
        combine.destroy(this.children, first);
        if(this.ondestroy) this.ondestroy();
        this.children = null;
    },
    get: function(i){
        return this.children[i]
    },
    push: function(item){
        this.children.push( item );
    }
}
Group.prototype.inject = Group.prototype.$inject = combine.inject

module.exports = Group;