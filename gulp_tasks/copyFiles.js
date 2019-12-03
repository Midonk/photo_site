const glob = require("glob");
const path = require("path");
const fs = require("fs");

// copy images

/**
 * copy all src/assets/img to ./dist/assets/img
 * preverse folders structure
 */
const dirsToCopy = [
    {
        src: "src/assets/img/",
        dist: "dist/assets/img/"
    },

    {
        src: "src/assets/fonts/",
        dist: "dist/assets/fonts/"
    }
];

function copyFiles(done){
    dirsToCopy.forEach((dir) => {
        // create needed patterns and variables
        let globPattern = `${dir.src}**/*`;
        let patternSrc = dir.src;
        let patternDist = dir.dist;

        // walk array of objkects and for each object found find all files, excluding directories
        let srcFiles = glob.sync(globPattern, {nodir: true});

        // walk array and for each source filePath
        // - create dist filepath
        // - extract dist directory
        // - create dist directory iof does not exist in the filesystem (we delete dist on each build)
        // - copy file from dist to src
        srcFiles.forEach((filePath) => {
            let srcFile = filePath;
            let distFile = filePath.replace(patternSrc, patternDist);
            let distDirectory = path.dirname(distFile);

            if(!fs.existsSync(distDirectory)){
                fs.mkdirSync(distDirectory, {recursive: true});
            }

            if(!fs.existsSync(distFile)){
                fs.copyFileSync(srcFile, distFile);
            }
        });

    });
    done();
}

module.exports = {
    copy: copyFiles
};