(function() {

  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var _definedModules = {};
  var _aliases = {};

  var Module = {
    _load: function(request, parent) {
      var name = Module._resolveFilename(request, parent);
      var definition = _definedModules[name];
      if (!definition) throw new Error('Cannot find module "' + name + '" from '+ '"' + parent + '"');

      if (Module._cache[name]) return Module._cache[name].exports;

      var localRequire = createLocalRequire(name);
      var module = {id: name, exports: {}};
      Module._cache[name] = module;
      definition.call(module.exports, module.exports, localRequire, module);
      return module.exports;
    },
    _cache: {},
    // TODO: Implement this to behave more like the Node environment
    _resolveFilename: function(request, parent) {
      var path = expand(dirname(parent), request);
      if (_definedModules.hasOwnProperty(path)) return path;
      path = expand(path, './index');
      if (_definedModules.hasOwnProperty(path)) return path;
      return request;
    }
  };

  var require = function(name, loaderPath) {
    return Module._load(name, loaderPath);
  };


  var expand = (function() {
    var reg = /^\.\.?(\/|$)/;
    return function(root, name) {
      var results = [], parts, part;
      parts = (reg.test(name) ? root + '/' + name : name).split('/');
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part === '..') {
          results.pop();
        } else if (part !== '.' && part !== '') {
          results.push(part);
        }
      }
      return results.join('/');
    };
  })();

  var createLocalRequire = function(parent) {
    return function(name) {
      return globals.require(name, parent);
    };
  };

  var dirname = function(path) {
    if (!path) return '';
    return path.split('/').slice(0, -1).join('/');
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (bundle.hasOwnProperty(key)) {
          _definedModules[key] = bundle[key];
        }
      }
    } else {
      _definedModules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in _definedModules) {
      if (_definedModules.hasOwnProperty(item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;

  require.define('module', function(exports, require, module) {
    module.exports = Module;
  });

})();