({
  paths: {
    "almond": "node_modules/almond/almond"
  },
  packages: [{
    name: "zepto_src",
    location: "node_modules/zepto/src",
    main: "zepto"
  }],
  baseUrl: '.',
  include: ['zepto_src', 'zepto_src/ajax', 'zepto_src/fx', 'zepto_src/fx_methods', 'zepto_src/event'],
  exclude: ['almond'],
  stubModules: ['text', 'hgn'],
  out: "build/zepto.min.js",
  pragmasOnSave: {
    excludeHogan: true
  },
  optimize: "uglify2",
  uglify2: {
    compress: {
      unsafe: true
    },
    mangle: true
  },
  onBuildRead: function (moduleName, path, contents) {
    console.log(moduleName);
    if (moduleName != "almond") {
      var searchTerm = "window.Zepto = Zepto\n'$' in window || (window.$ = Zepto)";
      var index = contents.indexOf(searchTerm);
      if (index >= 0) {
        contents = contents.substring(0, index);
        contents = "define([], function() {" + contents + "; return Zepto; })";
      } else {
        contents = "define(['zepto_src'], function(Zepto) {" + contents + "; return Zepto; })";
      }
    }
    return contents;
  },
  wrap: {
    end: "define('streamhub-zepto', ['zepto_src', 'zepto_src/ajax', 'zepto_src/fx', 'zepto_src/fx_methods', 'zepto_src/event'], function(Zepto) { return Zepto; })"
  }
})
