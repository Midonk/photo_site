const moment = require("moment");

module.exports = function(eleventyConfig) {
    /**
     * Date filter
     *
     * @param {String} date - js date object
     * @param {String} format - moment format string
     */
    eleventyConfig.addFilter("dateFormat", function(date, format){
        return moment(date).format(format);
    });

    // limit filter
    eleventyConfig.addFilter("limit", function (array, limit) {
        return array.slice(0, limit);
    });
/*
    eleventyConfig.addFilter("formatName", function(name){
        console.log(name);
        let tmp = name.slice(1, name.length);
        let firstLetter = name.charAt(0).toUpperCase();

        return firstLetter + tmp;
    });*/

    // collections
    eleventyConfig.addCollection("news",function(collection) {
        return collection.getFilteredByGlob("./src/news/*.md").sort((a, b) => {
            if (a.date > b.date) return -1;
            else if (a.date < b.date) return 1;
            else return 0;
        })
        //return collection.getFilteredByGlob("./src/news/*.md");
    });

    eleventyConfig.addCollection("galleries", function(collection) {
        return collection.getFilteredByGlob("./src/galleries/*.md").sort((a, b) => {
            if (a.date > b.date) return -1;
            else if (a.date < b.date) return 1;
            else return 0;
        })
        //return collection.getFilteredByGlob("./src/galleries/*.md");
    });

    // copy images in assets (rest handled by build tools)
    // eleventyConfig.addPassthroughCopy("src/assets/img/");

    // modify core config
    return {
        dir: {
            input: "src",
            output: "dist"
        },
        templateFormats: ["njk", "md"]
    };
};