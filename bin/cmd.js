#!/usr/bin/env node

var createStream = require('../bundler')

function piper(stream) {
  stream.resume()
  stream.pipe(createStream()).pipe(process.stdout)
}

if (process.argv[2]) {
  piper(require('fs').createReadStream(process.argv[2]))
} else {
  piper(process.stdin)
}
