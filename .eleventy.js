const pluginWebc = require("@11ty/eleventy-plugin-webc");
const yaml = require("js-yaml");
const imgsize = require('markdown-it-imsize');
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const { minify } = require("terser");
const { transform, browserslistToTargets } = require("lightningcss");
const browserslist = require("browserslist");
let targets = browserslistToTargets(browserslist("> 0.2% and not dead"));
const cssmin = async function (content) {
    // if clause targets bundle name
    if (this.type === 'css' || this.type === 'first') {
        let { code } = await transform({
            code: Buffer.from(content),
            minify: false,
            sourceMap: false,
            drafts: {
                customMedia: true
            },

            targets
        });
        return code;
    }
    else return content // important for next transform
};


const jsmin = async function (content) {
    // if clause targets bundle names
    if (this.type === 'js' || this.type === 'defer') {

        let result = await minify(content)
        return result.code
    }
    else {
        return content // important for next transform
    }
};

module.exports = function (eleventyConfig) {
      eleventyConfig.addPlugin(EleventyRenderPlugin);

    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

    eleventyConfig.addPlugin(pluginWebc, {
  components: "_components/**/*.webc",
        bundlePluginOptions: {
            transforms: [
                cssmin,
                jsmin

            ]
        }
    });
  //eleventyConfig.addPassthroughCopy({ "_components/css": "css" })
    eleventyConfig.amendLibrary("md", mdLib => mdLib.use(imgsize));
    return {
        dir: {
            // ⚠️ These values are relative to your input directory.
            layouts: "_layouts",
            output: "_public",
           
        }
    }
}; 