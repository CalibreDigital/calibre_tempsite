var gulp 	= require('gulp')
var sass        = require('gulp-sass')
var browserSync = require('browser-sync')
var reload      = browserSync.reload

gulp.task('sass', function (done) {  
  return gulp.src('sass/main.scss')
    .pipe(sass({ includePaths: ['scss'] }))
    .pipe(gulp.dest('css'))
})

gulp.task('watch:sass', function (done) {
  gulp.watch("sass/*.scss", gulp.series('sass'))
});

gulp.task('browser-sync', function(done) {  
  browserSync.init(["css/*.css", "js/*.js"], {
    server: {
      baseDir: "./"
    }
  })
  done()
})

gulp.task('default',
  gulp.series('sass',
    gulp.parallel('browser-sync', 'watch:sass')))
