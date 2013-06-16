createWorker.isWorker = isWorker
createWorker.createWorker = createWorker
createWorker.createWorkerURL = createWorkerURL

module.exports = createWorker

function createWorker() {
  return new Worker(createWorkerURL())
}

var url
function createWorkerURL() {
  return url = url || URL.createObjectURL(
    new Blob([';(' + __packed_worker.toString() + ')()'], {
      type: 'text/javascript'
    })
  )
}

function isWorker() {
  return __is_packed_worker
}
