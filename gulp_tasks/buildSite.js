const gulp = require("gulp");
const cp = require("child_process");

// build site with Eleventy
function buildSite(){
    return cp.spawn("npx", ["eleventy", "--quiet"], {stdio: "inherit", shell : true});
}

module.exports = {
    build: buildSite
};