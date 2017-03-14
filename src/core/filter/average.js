module.exports = function (Regular) {
    function total(array, key){
        var total = 0;
        if(!array) return;
        array.forEach(function( item ){
            total += key? item[key] : item;
        })
        return total;
    }

    // average: one-way
    //  - get: copute the average of the list
    //  - example: `{ list| average: "score" }`
    Regular.filter("average",  function(array, key){
        array = array || [];
        return array.length? total(array, key)/ array.length : 0;
    });
}