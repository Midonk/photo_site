const gulp = require("gulp");
const del = require("del");

// fin de task via callback => done()
function delDist(done){
    del.sync(["./dist"]);
    done();
}

module.exports = {
    delete : delDist
};