/**
 * Build js
 */
"use strict";

const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const notifier = require("../helpers/notifier");
const global = require("./../config.js");

module.exports = function () {
  const production = global.isProduction();
  const mainFileName = global.file.mainJsMin;
  const vendorFileName = global.file.vendorJsMin;

  return (done) => {
    try {
      const config = {
        mode: "none",
        entry: `./${global.folder.src}/js/${global.file.mainJs}`,
        output: {
          path: path.resolve(global.folder.build, `js/`),
          filename: mainFileName,
        },
        optimization: {
          splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
              vendor: {
                test: /[\\/](node_modules|vendor_entries)[\\/]/,
                filename: vendorFileName,
              },
            },
          },
          minimize: production,
          minimizer: [new TerserPlugin()],
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules)/,
              use: {
                loader: "babel-loader",
              },
            },
            {
              test: /\.m?ts$/,
              exclude: /(node_modules)/,
              use: {
                loader: "babel-loader",
              },
            },
          ],
        },
        resolve: {
          extensions: [".ts", ".js"],
        },
        plugins: [],
        externals: global.buildJs.externalLibs,
      };

      webpack(config, (error, stats) => {
        if (error) {
          throw new Error(error);
        }

        if (production) {
          console.log(
            stats.toString({
              version: false,
              hash: false,
              chunks: false,
              colors: true,
            })
          );
        }

        return done();
      });
    } catch (error) {
      notifier.error(error, "JS compiling error", done);
    }
  };
};
