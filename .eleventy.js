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

    // collections
    eleventyConfig.addCollection("news", function(collection) {
        return collection.getFilteredByGlob("./src/news/*.md");
    });

    // copy images in assets (rest handled by build tools)
    // eleventyConfig.addPassthroughCopy("src/assets/img/");

    // modify core config
    return {
        dir: {
            input: "src",
            output: "dist"
        }
    };
};