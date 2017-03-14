module.exports = function (Regular) {
    // last: one-way
    //  - get: return the last item in list
    //  - example: `{ list|last }`
    Regular.filter("last",  function(arr){
        return arr && arr[arr.length - 1];
    });
}