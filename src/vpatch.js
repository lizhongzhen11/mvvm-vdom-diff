import { isString } from './utils'

/**
 * @name Vpatch
 * @author lizhongzhen11
 * @see 新旧vnode数据的差异对象结构
 */
export default class Vpatch {
  constructor (oldVnode, patch) {
    this.oldVnode = oldVnode
    this.patch = patch
  }
}