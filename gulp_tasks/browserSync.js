const gulp = require("gulp");
const browsersync = require("browser-sync").create();

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

module.exports = {
    launch: browserSync
};