const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

// Build Sass and use PostCSS autoprefixer / cssnano
// Browser options for autoprefixer in package.json
function buildSass(){
    return gulp
        .src("./src/assets/scss/main.scss")
        .pipe(sass({outputStyle: 'expanded'}))
        //.pipe(gulp.dest("./dist/assets/css/"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest("./dist/assets/css/"));
}

module.exports = {
    build: buildSass
};