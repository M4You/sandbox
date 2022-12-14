/**
 * Lint JS
 */
"use strict";

const CLIEngine = require("eslint").CLIEngine;

const global = require("./../config.js");

module.exports = function () {
  const fixJs = global.isFixJs();
  const cli = new CLIEngine({
    fix: fixJs,
    useEslintrc: true,
  });

  return (done) => {
    const report = cli.executeOnFiles([`./${global.folder.src}/js/**/*.js`, `./${global.folder.src}/js/**/*.ts`]);
    const formatter = cli.getFormatter();

    if (formatter(report.results) !== "")
      console.log(formatter(report.results));

    CLIEngine.outputFixes(report);

    return done();
  };
};
