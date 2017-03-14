var path = require('path');
var gulp = require('gulp');
var spawn = require('child_process').spawn;
var jshint = require('gulp-jshint');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var through = require('through2');

var wpConfig = {
  output: {
    filename: "regular.js",
    library: "Regular",
    libraryTarget: "umd"
  }
}



gulp.task('default', ['watch'], function() {});


// build after jshint
gulp.task('build',["jshint"], function(){
  // form minify    
  gulp.src('./src/index.js')
    .pipe(webpack(wpConfig))
    .pipe(wrap(signatrue))
    .pipe(gulp.dest('./dist'))
    .pipe(wrap(mini))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
    .on("error", function(err){
      throw err
    })
})




gulp.task('watch', ["build"], function(){
  // gulp.watch(['src/**/*.js'], ['build']);
  gulp.watch(['src/**/*.js'], ['jshint'])
})



// 
gulp.task('jshint', function(){
      // jshint
  gulp.src(['src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))

})



function wrap(fn){
  return through.obj(fn);
}

function signatrue(file, enc, cb){
  file.contents =  Buffer.concat([file.contents]);
  cb(null, file);
}

function mini(file, enc, cb){
  file.path = file.path.replace('.js', '.min.js');
  cb(null, file)
}
