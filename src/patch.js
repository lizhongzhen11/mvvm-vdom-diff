export const patch = (patches) => {
  patches.forEach(patch => {
    patch.node.nodeValue = patch.newVnode
  })
  patches.length = 0
}