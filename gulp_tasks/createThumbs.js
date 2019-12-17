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
        dist: "dist/assets/img/galleries/_600xauto",
        options: {
            width: 600
        }
    },
    {
        src: "src/assets/img/galleries",
        dist: "dist/assets/img/galleries/_1024xauto",
        options: {
            width: 1024
        }
    },
    {
        src: "src/assets/img/news_illu",
        dist: "dist/assets/img/news_illu/_600xauto",
        options: {
            width: 600
        }
    },
    {
        src: "src/assets/img/news_illu",
        dist: "dist/assets/img/news_illu/_1024xauto",
        options: {
            width: 1024
        }
    },
    {
        src: "src/assets/img/page_banners",
        dist: "dist/assets/img/page_banners/_600x400",
        options: {
            width: 600,
            height: 400,
            fit: "cover",
            position: 'top',
        }
    },
    {
        src: "src/assets/img/page_banners",
        dist: "dist/assets/img/page_banners/_600xauto",
        options: {
            width: 600
        }
    },
    {
        src: "src/assets/img/page_banners",
        dist: "dist/assets/img/page_banners/_1024xauto",
        options: {
            width: 1024
        }
    }
];

function createThumbnails(done) {
    transforms.forEach(transform => {
        let globPattern = `${transform.src}/**/*`;
        let srcFiles = glob.sync(globPattern, { nodir: true });
        srcFiles.forEach((filePath) => {
            let srcFile = filePath;
            let fileName = path.basename(srcFile);
            let distFile = `${transform.dist}/${fileName}`;

            if (!fs.existsSync(transform.dist)) {
                fs.mkdirSync(transform.dist, { recursive: true });
            }

            if (!fs.existsSync(distFile)) {
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
