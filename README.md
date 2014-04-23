# CommonJS Require

browser-side [CommonJS require() function](http://wiki.commonjs.org/wiki/Modules/1.1.1#Require).

## Usage

Add `commonjs-require.js` as script src to your site.


### Example

```html
<script src="commonjs-require.js"></script>
<script>
require.register("module", function(exports, require, module){
  /* Some Module content */
  module.exports = "content"
})
alert(require('module'))
</script>
```

This will alert `content`


## Automated wrapping into `require.register`

* [gulp-wrap-commonjs](https://github.com/efacilitation/gulp-wrap-commonjs)
* [grunt-wrap-commonjs](https://github.com/efacilitation/grunt-wrap-commonjs)


## Why not browserify?

Browserify requires (scnr) that you use some magic AST/require.resolve mechanism to built your CommonJS package/files for the browser. This is really complex - especially if you have to bundle different files for different sections of your website, use dynamic requires or have circular dependencies.


## API

* `require(name)` — loads registered module and returns its `exports`.
* `require.register(name, fn)` — registers new module. `fn` should have signature `exports, require, module`.
* `require.list()` — lists all registered modules.

## Node Module support

commonjs-require emulates the actual loading mechanism from Node.js in that it delegates all require() calls to
Module._load() (Module is exposed via the "module" module). This improves support for modules which rely on the Node
module system implementation (for example Mockery).

### Module API

* `Module._load(request, parent)` - does the actual module loading and instantiation
* `Module._cache` - is the cache of loaded modules, can be cleared by assigning an empty object
* `Module._resolveFilename` - determines the actual module id (e.g. adds "index" if its missing)

## License

MIT

* Copyright (c) 2014 [efa GmbH](http://efa-gmbh.com) ([Initial Reason of Fork](https://github.com/brunch/commonjs-require-definition/pull/8))
* Copyright (c) 2013-2014 [Paul Miller](http://paulmillr.com/)
