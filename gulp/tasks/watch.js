/**
 * Watch for file changes
 */
"use strict";

const gulp = require("gulp");
const del = require("del");
const path = require("path");

const global = require("./../config.js");

module.exports = function (options) {
  const filesList = global.getFilesToCopy();

  async function cleaning(file) {
    const config = {
      force: true,
      dot: true,
    };

    const filePathSrc = path.relative(path.resolve(global.folder.src), file);
    const filePathBuild = `./${global.folder.build}/${filePathSrc}`;

    await del(filePathBuild, config);
  }

  return () => {
    gulp
      .watch(`./${global.folder.php}/**/*.php`)
      .on("change", options.browserSyncInstance.reload);

    gulp.watch(
      `./${global.folder.src}/scss/**/*.scss`,
      gulp.series(global.task.buildStyles, global.task.buildStylesCustom)
    );

    gulp.watch(
      `./${global.folder.src}/js/**/*.js`,
      gulp.series(global.task.lintJs, global.task.buildJs)
    );

    gulp.watch(
      `./${global.folder.src}/vendor_entries/**/*.js`,
      gulp.series(global.task.buildJs)
    );

    gulp.watch(
      `./${global.folder.src}/vendor_entries/**/*.scss`,
      gulp.series(global.task.buildStylesVendors)
    );

    gulp
      .watch(filesList)
      .on("unlink", (file) => cleaning(file))
      .on("add", gulp.series(global.task.copyFiles));

    gulp
      .watch(`${global.folder.src}/images/**`)
      .on("unlink", (file) => cleaning(file))
      .on("add", gulp.series(global.task.buildImages));

    gulp
      .watch(`${global.folder.src}/images/svg/*.svg`)
      .on("add", gulp.series(global.task.buildSvgSprite));

    gulp
      .watch([
        `./${global.folder.build}/**`,
        `!./${global.folder.build}/**/*.map`,
      ])
      .on("change", options.browserSyncInstance.reload)
      .on("unlink", options.browserSyncInstance.reload)
      .on("add", options.browserSyncInstance.reload);
  };
};
