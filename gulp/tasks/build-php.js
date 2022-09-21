/**
 * Build html from templates
 */
"use strict";

const gulp = require("gulp");

const global = require("./../config.js");

module.exports = function () {
  return (done) => {
    return gulp.src(`${global.folder.php}/**/*.php`);
  };
};
