/**
 * Build styles for application
 */
"use strict";

const gulp = require("gulp");
const svgSprite = require("gulp-svg-sprite");
const cheerio = require("gulp-cheerio");
const svgClean = require("gulp-cheerio-clean-svg");

const global = require("./../config.js");

module.exports = function () {
  return (done) => {
    return gulp
      .src(`./${global.folder.svg}/*.svg`)
      .pipe(
        cheerio(
          svgClean({
            removeSketchType: true,
            removeEmptyGroup: true,
            removeEmptyDefs: true,
            removeEmptyLines: true,
            removeComments: true,
            tags: ["title", "desc"],
            attributes: [
              "id",
              "style",
              "fill",
              "stroke*",
              "mask",
              "opacity",
              "width",
              "height",
              "transform",
            ],
          })
        )
      )
      .pipe(
        svgSprite({
          mode: {
            stack: {
              sprite: "../sprite.svg", //sprite file name
            },
          },
        })
      )
      .pipe(gulp.dest(`./${global.folder.build}/images/svg`));
  };
};
