import Watcher from './watcher'
import { isString, isObject } from './utils'
import { Reg, RegSquareBrackets } from './config.js'

/**
 * @name Compiler
 * @author lizhongzhen11
 * @see 实例化Mvvm时才会实例化Compiler
 * @see 将初始传过来的vnode数据中的{{变量}}解析，用data中对应的数据替换
 * @see 一旦遇到{{变量}}，需要把该节点数据添加到订阅中，方便更新
 * 
 * @param {rootNode} 这个rootNode代表页面中接受插入的根节点，这里默认是id为root的节点
 */
export default class Compiler {
  constructor (data, rootNode, fragment, vnode) {
    this.data = data
    this.rootNode = rootNode
    this.fragment = fragment
    this.vnode = vnode
    this.render()
  }
  render () {
    let data = this.data
    const replace = (node, vnode, parent, i) => {
      if (isString(vnode)) {
        node.nodeValue = replaceText(true, parent, vnode, this.data, this.rootNode, i)
      } else {
        vnode.children.forEach((child, index) => replace(node.childNodes[index], child, vnode, index))
      }
    }
    replace(this.fragment, this.vnode)
    while(this.fragment.firstChild) {
      this.rootNode.appendChild(this.fragment.firstChild)
    }
  }
}

/**
 * 
 * @param {*} initMounted 初始实例化Compiler时为true，然后才能实例化Watcher
 * @param {*} parent 父节点对应的vnode
 * @param {*} vnode 当前文本节点vnode
 * @param {*} data 数据源
 * @param {*} rootNode 根节点，DOM节点
 * @param {*} i 当前文本节点在父节点中的位置
 */
const replaceText = (initMounted, parent, vnode, data, rootNode, i) => {
  return vnode.replace(Reg, (match, p1) => {
    let keys = p1.split('.')
    // initMounted && new Watcher(data, keys, parent, rootNode, i, replaceText)
    let result = keys.reduce((val, key) => {
      let match = key.match(RegSquareBrackets)
      if (match && match.length) {
        let index = key.indexOf('[')
        let arrProperty = key.slice(0, index)
        initMounted && new Watcher(val, arrProperty, parent, rootNode, i, replaceText)
        return match.reduce((prev, next) => {
          let arrIndex = +JSON.parse(next) // next是'[0]'这种形式，需要转换下拿到数组下标0
          let nextValue = prev[arrIndex]
          return nextValue
        }, val[arrProperty])
      } else {
        if (!isObject(val[key])) {
          initMounted && new Watcher(val, key, parent, rootNode, i, replaceText)
        }
        return val[key] || ''
      }
    }, data)
    return result
  })
}