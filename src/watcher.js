import Dep from './dep'
import { queueWatcher } from './scheduler'
import { Reg, RegSquareBrackets } from './config.js'

/**
 * @name Watcher
 * @author lizhongzhen11
 * @see Watcher类，配合Dep进行发布订阅改变
 * @see 只在Compiler实例化时，才会把需要解析的变量通过get操作放入订阅中
 * @see 关键点在于对data的遍历获取，变相的调用了data的get方法
 */
export default class Watcher {
  constructor (data, key, parent, rootNode, index, replaceText, oldVnode) {
    this.data = data
    this.key = key
    this.parent = parent // 父节点，根据这个可以去重以及确定需要改变的文本节点
    this.index = index // oldVnode在parent中的位置，类似于数组下标
    this.replaceText = replaceText
    this.oldVnode = oldVnode
    Dep.target = this
    // keys.reduce((val, k) => val[k], data)
    let val = data[key]
    Dep.target = null
  }
  update () {
    // 得到新的文本节点数据
    this.newVnode = this.replaceText(false, this.parent, this.parent.children[this.index], this.data)
    console.log(this)
    // queueWatcher(this, newVnode)
  }
}
