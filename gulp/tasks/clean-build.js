/**
 * Clean build folder
 */
"use strict";

const del = require("del");

const global = require("./../config.js");

module.exports = function () {
  const config = {
    force: true,
    dot: true,
  };

  const production = global.isProduction();
  const buildFolders = production ? [`./${global.folder.build}/**`] : [];
  const delFolders = [...buildFolders];

  return async () => {
    const deletedPaths = await del(delFolders, config);

    // log paths for deleted files & directories
    // console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
  };
};
