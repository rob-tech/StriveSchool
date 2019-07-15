var gulp = require("gulp");
var sass = require("gulp-sass")
var browserSync = require("browser-sync").create()
var source = "./sass/"
var destination = './builds/'
sass.compiler = require("node-sass")
function html() {
   return gulp.src(destination + "**/*.html")
}
function js() {
   return gulp.src(destination + "**/*.js")
}
function styles(){
   return gulp.src(source + "style.scss").pipe(sass().on("error", sass.logError)).pipe(gulp.dest(destination+ "css"))
}
function server(){
   browserSync.init({
       notify: false,
       server: {
           baseDir: destination
       }
   })
   gulp.watch(source + "**/*.scss", styles).on("change", browserSync.reload)
   gulp.watch(dest + "js/**/*.js", js).on("change", browserSync.reload);
   gulp.watch(dest + "index.html", html).on("change", browserSync.reload);
}
var build = gulp.series(gulp.parallel(js, styles, html), server)
gulp.task("default", build)
