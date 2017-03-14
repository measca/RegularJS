module.exports = function (Regular) {
    // total: one-way
    //  - get: copute the total of the list
    //  - example: `{ list| total: "score" }`
    Regular.filter("total",  function(array, key){
        var total = 0;
        if(!array) return;
        array.forEach(function( item ){
            total += key? item[key] : item;
        })
        return total;
    });
}