const queue = []

export const queueWatcher = (watcher, newVnode) => {
  queue.push(watcher)
  nextTick()
}

const nextTick = () => {
  new Promise(resolve => {})
}