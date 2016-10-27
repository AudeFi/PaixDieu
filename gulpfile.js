var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');
/*var modernizr = require('gulp­modernizr');*/
var postcss = require('gulp-postcss');
var pxtorem = require('postcss-pxtorem');


gulp.task('watch', ['browserSync', 'sass', 'fileinclude'], function(){
  // Run sass compilation task whenever SASS files change
  gulp.watch('app/scss/**/*.scss', ['sass']);
  // Run html file includes task whenever HTML files change
  gulp.watch('app/includes/**/*.html', ['fileinclude']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

// Compiles all HTML files included to one index.html
gulp.task('fileinclude', function() {
  gulp.src(['app/includes/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('app'));
});

// Converts Sass to CSS and prefix
gulp.task('sass', function(){
  var processors = [
        pxtorem({
            replace: false,
            propWhiteList: []
        })
  ];

  return gulp.src('app/scss/main.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(postcss(processors))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Hot reload 
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

// NOT CALLED YET 
gulp.task('modernizr', function() {
  gulp.src(['./js/**/*.js', './css/**/*.css'])
    .pipe(modernizr({
      "options" : [
        "setClasses", "addTest", "html5printshiv", "testProp", "fnBind"
        ]
  }))
  .pipe(gulp.dest("build/"))
}); 

// Minifies JS & CSS each into one file and them copy them and the html to /dist folder
gulp.task('useref', function(){
  return gulp.src('app/index.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// min the images and cache them
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

// Copy the fonts to the /dist folder
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

/* Clean the /dist folder*/
gulp.task('clean:dist', function() {
  return del.sync('dist');
});


/* Default task which compiles sass and html includes, run hot reload and watch for changes */
gulp.task('default', function (callback) {
  runSequence(['fileinclude', 'sass','browserSync', 'watch'],
    callback
  )
});

/* Build task which compiles scss, html includes, js, minify css & js & images */
gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['fileinclude', 'sass', 'images', 'fonts'], 'useref',
    callback
  )
});