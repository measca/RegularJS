module.exports = function (Regular) {
    Regular.directive( /^on-\w+$/, function( elem, value, name , attrs) {
        if ( !name || !value ) return;
        var type = name.split("-")[1];
        return this._handleEvent( elem, type, value, attrs );
    });
}