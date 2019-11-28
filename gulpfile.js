const gulp = require("gulp");

// import tasks
const scss = require("./gulp_tasks/styles");
const del = require("./gulp_tasks/del");
const bundle = require("./gulp_tasks/bundleJs");
const buildSite = require("./gulp_tasks/buildSite");
const browserSync = require("./gulp_tasks/browserSync");
const copyFiles = require("./gulp_tasks/copyFiles");
const thumbnails = require("./gulp_tasks/createThumbs");



// watch my files, dummy
function watchFiles(){
    gulp.watch("./src/assets/scss/**/*", scss.build);
    gulp.watch("./src/assets/js/**/*", bundle.bundle);
    gulp.watch(["./src/**/*", "!./src/assets/**/*"], buildSite.build);
}

// define complex tasks
const build = gulp.series(del.delete, gulp.parallel(bundle.bundle, scss.build, buildSite.build, copyFiles.copy, thumbnails.create));
const watch = gulp.parallel(browserSync.launch, watchFiles);

exports.build = build;
exports.watch = watch;
exports.default = build;