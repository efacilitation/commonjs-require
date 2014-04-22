window.require.register({'module': function(exports, require, module) {

    var self = {};
    self._load = window.require;
    window.require = function() {
        return self._load.apply(window, arguments);
    };
    self._cache = require._cache;
    module.exports = self;

}});