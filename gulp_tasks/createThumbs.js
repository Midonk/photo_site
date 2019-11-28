const glob = require("glob");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

// optimise images

/**
 * create array with source and destination globs
 *- srource and destination globs
 * - size in width and height
 * - option (quality, ...)
 */

const transforms = [
    {
        src: "src/assets/img/galleries",
        dist: "dist/assets/img/galleries/_600x600",
        options: {
            width: 600,
            height: 600,
            resize: "fit",
        }
    },
    {
        src: "src/assets/img/galleries",
        dist: "dist/assets/img/galleries/_200x200",
        options: {
            width: 200,
            height: 200,
            resize: "fit",
        }
    }
];

function createThumbnails(done) {
    transforms.forEach(transform => {
        let globPattern = `${transform.src}/**/*`;
        let srcFiles = glob.sync(globPattern, {nodir: true});
        srcFiles.forEach((filePath) => {
            let srcFile = filePath;
            let fileName = path.basename(srcFile);
            let distFile = `${transform.dist}/${fileName}`;

            if(!fs.existsSync(transform.dist)) {
                fs.mkdirSync(transform.dist, {recursive: true});
            }

            if(!fs.existsSync(distFile)) {
                sharp(srcFile)
                    .resize(transform.options)
                    .toFile(distFile)
                    .catch((error) => {
                        throw new Error(error);
                    });
            }
        });
    });
    done();
}

module.exports = {
    create: createThumbnails
};