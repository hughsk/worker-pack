# worker-pack #

A quick and dirty way of running Web Workers within a single
[browserified](http://browserify.org/) bundle.

Intended as a solution that works now, avoiding any significant tradeoffs
(e.g. duplicate scripts) until the compile step doesn't need to happen
anymore.

## Installation ##

``` bash
npm install worker-pack
```

## Usage ##

Firstly, though worker-pack is intended for Browserify v2 it isn't packaged as
a transform stream. Instead, you just have to pipe Browserify's output through
the worker-pack CLI:

``` bash
# Instead of this:
browserify index.js > bundle.js
# Do this:
browserify index.js | node_modules/.bin/worker-pack > bundle.js
```

Now you should be able to `require('worker-pack')` from `index.js`:

``` javascript
var pack = require('worker-pack')

if (pack.isWorker()) {
  self.onmessage = function() { self.postMessage('beep boop') }
} else {
  var worker = pack.createWorker()
  worker.onmessage = function(e) { console.log(e.data) }
  worker.postMessage()
}
```

If you want to use the [workerstream](http://npmjs.org/package/workerstream)
module, you can just get a Worker URL and pass that to the stream:

``` javascript
var workerstream = require('workerstream')
  , pack = require('worker-pack')

if (!pack.isWorker()) {
  var worker = workerstream(pack.createWorkerURL())
}
```
