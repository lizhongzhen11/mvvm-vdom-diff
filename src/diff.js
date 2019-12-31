export const diff = (watchers) => {
  let patches = []
  let len = watchers.length
  for (let i = 0; i < len; i++) {
    walk(patches, watchers[i], i)
  }
  return patches
}

const walk = (patches, watcher, i) => {
  patches[i] = {
    node: watcher.node,
    oldVnode: watcher.parent.children[watcher.index],
    newVnode: watcher.newVnode
  }
}