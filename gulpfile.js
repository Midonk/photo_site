const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const del = require("del");
const webpack = require("webpack");
const webpackConfig = require("./webppackConfig");
const cp = require("child_process");
const browsersync = require("browser-sync").create();

// GULP FONCTIONNE EN ASYNC
// IL FAUT LUI SIGNALER LA FIN DES TACHES
// 6 façons https://gulpjs.com/docs/en/getting-started/async-completion

// Build Sass and use PostCSS autoprefixer / cssnano
// Browser options for autoprefixer in package.json
function buildSass(){
    return gulp
        .src("./src/assets/scss/main.scss")
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest("./dist/assets/css/"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest("./dist/assets/css/"));
}

// fin de task via callback => done()
function delDist(done){
    del.sync(["./dist"]);
    done();
}

// Use webpack config to run webpack using a Promise
// We load the config file in a variable for convenience
// https://webpack.js.org/configuration/configuration-types/#exporting-a-promise
function bundleJs(){
    return new Promise((resolve, reject) => {
        webpack(webpackConfig, (err, stats) => {
            // reject if errors
            if (err) {
                return reject(err);
            }
            // tranform info to JSON
            const info = stats.toJson();
            // reject if compilation errors
            if (stats.hasErrors()) {
                return reject(info.errors);
            }
            // reject if compilation warnings
            if (stats.hasWarnings()) {
                return reject(info.warnings);
            }
            // log as the CLI would
            console.log(
                stats.toString({
                    chunks: false, // Makes the build much quieter
                    colors: true // Shows colors in the console
                })
            );
            // resolve
            resolve();
        });
    });
}

// build site with Eleventy
function buildSite(){
    return cp.spawn("npx", ["eleventy", "--quiet"], {stdio: "inherit", shell : true});
}

// browsersync: serve a directory
// and watch relevant files in dist
function browserSync(done){
    browsersync.init({
        server: {
            baseDir: "./dist/"
        },
        files: [
            "./dist/assets/js/*.js",
            "./dist/assets/css/*.css",
            "./dist/*.html", "./dist/**/*.html",
            "./dist/*.xml", "./dist/**/*.xml"
        ],
        port: 3000,
        open: false
    });
    done();
}

// watch my files, dummy
function watchFiles(){
    gulp.watch("./src/assets/scss/**/*", buildSass);
    gulp.watch("./src/assets/js/**/*", bundleJs);
    gulp.watch(["./src/**/*", "!./src/assets/**/*"], buildSite);
}

// define complex tasks
const build = gulp.series(delDist, gulp.parallel(bundleJs, buildSass, buildSite));
const watch = gulp.parallel(browserSync, watchFiles);

exports.build = build;
exports.watch = watch;
exports.default = build;