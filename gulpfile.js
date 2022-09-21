"use strict";

const gulp = require("gulp");
const browserSyncInstance = require("browser-sync").create();

const global = require("./gulp/config.js");

const cleanBuild = require("./gulp/tasks/clean-build");
const buildPhp = require("./gulp/tasks/build-php");
const buildStyles = require("./gulp/tasks/build-styles");
const buildStylesCustom = require("./gulp/tasks/build-styles-custom");
const buildStylesVendors = require("./gulp/tasks/build-styles-vendors");
const lintJs = require("./gulp/tasks/lint-js");
const buildJs = require("./gulp/tasks/build-js");
const buildImages = require("./gulp/tasks/build-images");
const svgSprite = require("./gulp/tasks/svg-sprite");
const copyFiles = require("./gulp/tasks/copy-files");
const browserSync = require("./gulp/tasks/browser-sync-server");
const watch = require("./gulp/tasks/watch");

/**
 * Clean build folders
 */
gulp.task(global.task.cleanBuild, cleanBuild());

/**
 * Template HTML
 */
gulp.task(global.task.buildPhp, buildPhp());

/**
 * Build styles for application
 */
gulp.task(global.task.buildStyles, buildStyles());

/**
 * Build styles custom files listed in the config
 */
gulp.task(global.task.buildStylesCustom, buildStylesCustom());

/**
 * Build styles for vendor
 */
gulp.task(global.task.buildStylesVendors, buildStylesVendors());

/**
 * Lint JS
 */
gulp.task(global.task.lintJs, lintJs());

/**
 * Fix JS files
 */
gulp.task(global.task.fixJs, lintJs());

/**
 * Build JS
 */
gulp.task(global.task.buildJs, buildJs());

/**
 * Copy & minify images
 */
gulp.task(global.task.buildImages, buildImages());

/**
 * Build svg sprite
 */
gulp.task(global.task.buildSvgSprite, svgSprite());

/**
 * Copy folders to the build folder
 */
gulp.task(global.task.copyFiles, copyFiles());

/**
 * Start browserSync server
 */
gulp.task(global.task.browserSync, browserSync({ browserSyncInstance }));

/**
 * Watch for file changes
 */
gulp.task(global.task.watch, watch({ browserSyncInstance }));

/**
 * Develop mode - with browser sync, file watch & live reload
 */
gulp.task(
  "default",
  gulp.series(
    global.task.cleanBuild,
    global.task.lintJs,
    gulp.parallel(
      gulp.series(global.task.buildPhp),
      gulp.series(
        global.task.buildStyles,
        global.task.buildStylesCustom,
        global.task.buildStylesVendors
      ),
      gulp.series(global.task.buildJs)
    ),
    global.task.buildImages,
    global.task.buildSvgSprite,
    global.task.copyFiles,
    gulp.parallel(global.task.browserSync, global.task.watch)
  )
);

/**
 * Production mode - creating production folder without unnecessary files
 */
gulp.task(
  global.task.build,
  gulp.series(
    global.task.cleanBuild,
    global.task.lintJs,
    gulp.parallel(
      gulp.series(global.task.buildPhp),
      gulp.series(
        global.task.buildStyles,
        global.task.buildStylesCustom,
        global.task.buildStylesVendors
      ),
      gulp.series(global.task.buildJs)
    ),
    global.task.buildImages,
    global.task.buildSvgSprite,
    global.task.copyFiles
  )
);
