var through = require('through')

module.exports = createStream
function createStream() {
  var stream = through(write, end)
    , first = true

  return stream

  function write(data) {
    if (first) {
      stream.queue('(function(){')
      stream.queue('(function __packed_worker() {')
      stream.queue('var __is_packed_worker = !("document" in this)')
      first = false
    }
    stream.queue(data)
  }

  function end() {
    stream.queue('})();')
    stream.queue('})();')
    stream.queue(null)
  }
}
