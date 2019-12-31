import { diff } from './diff'
import { patch } from './patch'

const queue = []

export const queueWatcher = (watcher) => {
  queue.push(watcher)
  nextTick()
}

// 把所有的需要更新的watcher放进微任务中，等同步代码执行完一次性更新
const nextTick = () => {
  Promise.resolve().then(() => {
    let patches = diff(queue)
    patch(patches)
    queue.length = 0
  })
}
