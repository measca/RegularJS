module.exports = function (Regular) {
    // json:  two way 
    //  - get: JSON.stringify
    //  - set: JSON.parse
    //  - example: `{ title|json }`
    Regular.filter('json', {
        get: function( value ){
            return typeof JSON !== 'undefined'? JSON.stringify(value): value;
        },
        set: function( value ){
            return typeof JSON !== 'undefined'? JSON.parse(value) : value;
        }
    });
}