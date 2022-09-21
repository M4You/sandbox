/**
 * Start browserSync server
 */
"use strict";

const fs = require("fs");

const global = require("./../config.js");

module.exports = function (options) {
  return () => {
    options.browserSyncInstance.init({
      proxy: global.domain,
      tunnel: false,
      host: global.domain,
      notify: false,
      injectChanges: false,
      minify: false,
      snippetOptions: {
        // Provide a custom Regex for inserting the snippet
        rule: {
          match: /$/i,
          fn: (snippet, match) => snippet + match,
        },
      },
      port: 8080,
    });
  };
};
