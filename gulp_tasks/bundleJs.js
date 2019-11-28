const gulp = require("gulp");
const webpack = require("webpack");
const webpackConfig = require("./../webppackConfig");

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

module.exports = {
    bundle:bundleJs
};