const conf = require('./gulp.conf');

module.exports = function () {
  return {
    port: 3002,
    ui: {
      port: 3004,
      weinre: {
          port: 9090
      }
    },
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ]
    },
    open: false
  };
};
