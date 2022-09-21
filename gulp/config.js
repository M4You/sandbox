module.exports = {
    task: {
      buildPhp: 'build-php',
      lintJs: 'lint-js',
      fixJs: 'fix-js',
      buildJs: 'build-js',
      buildStyles: 'build-styles',
      buildStylesCustom: 'build-styles-custom',
      buildStylesVendors: 'build-styles-vendors',
      buildImages: 'build-images',
      buildSvgSprite: 'svg-sprite',
      cleanBuild: 'clean-build',
      copyFiles: 'copy-files',
      browserSync: 'browser-sync',
      watch: 'watch',
      build: 'build',
    },
    folder: {
      tasks: 'gulp/tasks',
      src: 'src',
      php: 'src/php',
      svg: 'src/images/svg',
      build: 'public/assets',
    },
    file: {
      mainJs: 'app.js',
      mainJsMin: 'app.min.js',
      vendorJs: 'vendor.js',
      vendorJsMin: 'vendor.min.js',
      mainStylesSrc: 'app.scss',
      mainStylesMin: 'app.min.css',
      vendorStylesSrc: 'vendor.scss',
      vendorStylesMin: 'vendor.min.css',

    },
    buildStyles: {
      // Sorting type css media queries: 'desktop-first' || 'mobile-first'
      sortType: 'mobile-first',
    },
    buildJs: {
      // externalLibs: {
      //     jquery: 'jQuery'
      // },
    },
    buildImages: {
      imageExtensions: 'jpg,jpeg,png,svg,gif,ico',
      isImageMin: false,
    },
    error: {
      sound: true,
      title: '< GULP ERROR >',
      icon: './gulp/system_files/icons/error_icon.png',
      wait: true,
    },
    domain: 'sandbox.local',
    getFilesForStylesCustom() {
      return {
        files: [],
        // gcmq - group css media queries
        isGcmq: false,
      };
    },
    getFilesToCopy() {
      return [
        `./${this.folder.src}/**`,
        `!{${this.folder.src}/images/svg/,${this.folder.src}/images/svg/**}`,
        `!{${this.folder.src}/js,${this.folder.src}/js/**}`,
        `!{${this.folder.src}/scss,${this.folder.src}/scss/**}`,
        `!{${this.folder.src}/vendor_entries,${this.folder.src}/vendor_entries/**}`,
      ];
    },
    isProduction() {
      return process.argv[process.argv.length - 1] === this.task.build;
    },
    isFixJs() {
      return process.argv[process.argv.length - 1] === this.task.fixJs;
    }
  };
  