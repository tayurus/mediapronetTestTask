let gulp = require("gulp");
let jade = require("gulp-jade");
let autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
let cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
var stylus = require('gulp-stylus');
var reload      = browserSync.reload;
// SOURCES
let src = {
    stylus: ["**/*.styl","**/*.css", "!node_modules/**/*.css", "!build/**/*.css", "!node_modules/**/*.styl"],
    js: ["**/*.js", "!node_modules/**/*.js", "!gulpFile.js", "!build/**/*.js"],
    pages: ["pages/**/*.jade"],
    img: ["**/*.png", "**/*.jpg", "**/*.svg", "**/*.ico", "!node_modules/**/*.ico", "!node_modules/**/*.jpg", "!node_modules/**/*.png", "!node_modules/**/*.svg", "!build/**/*.ico", "!build/**/*.svg", "!build/**/*.jpg", "!build/**/*.png", ]
}

let dist = {
    main: "build",
    img: "build/img"
}

gulp.task("build", function() {
    //PAGES
    gulp.src(src.pages).pipe(jade({
        pretty: "\t"
    })).pipe(gulp.dest(dist.main));

    // IMG
    gulp.src(src.img).pipe(rename({
        dirname: ''
    })).pipe(gulp.dest(dist.img));

    //CSS
    let autoprefixBrowsers = ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'];
    gulp.src(src.stylus)
        .pipe(stylus())
        .pipe(concat("styles.css"))
        .pipe(cleanCSS())
        .pipe(autoprefixer({
            browsers: autoprefixBrowsers
        }))
        .pipe(gulp.dest(dist.main));

    //JS
    gulp.src(src.js).pipe(concat("script.js")).pipe(gulp.dest(dist.main))

    //FONTS
    gulp.src("fonts/**/*.*",  { base: './' }).pipe(gulp.dest(dist.main))
})

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./build"
    },
    port: 8080,
    open: true,
    notify: false
  });
});

gulp.task("watch", ["build"], function() {
    // gulp.watch(Object.values(src), ["build"]);
    gulp.watch([src.js, src.stylus, src.pages, src.img, ['blocks/**/*jade']], ["build"]);
})

gulp.task("default", ['browserSync', 'watch'], function(){

})
