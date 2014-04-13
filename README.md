# CommonJS Require

browser-side [CommonJS require() function](http://wiki.commonjs.org/wiki/Modules/1.1.1#Require).

## Usage

Add the `commonjs-require.js` as script src to your site. Now you can register modules with `require.register(name, fn)`.


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

Browserify requires (scnr) that you use some magic AST/require.resolve mechanism to built your CommonJS package/files for the browser. Some people find this to complex, especially if you have to bundle different files for different sections of your website or use dynamic requires.


## API

* `require(name)` — loads registered module and returns its `exports`.
* `require.register(name, fn)` — registers new module. `fn` should have signature `exports, require, module`.
* `require.list()` — lists all registered modules.
* `require.clearCache(name)` — allows to clear the require cache. You can pass the optional parameter `name` to clear the cache of a specific module.


## License

MIT

* Copyright (c) 2014 [efa GmbH](http://efa-gmbh.com) ([Initial Reason of Fork](https://github.com/brunch/commonjs-require-definition/pull/8))
* Copyright (c) 2013-2014 [Paul Miller](http://paulmillr.com/)
