import Vnode from './vnode'
// import Dep from './dep'
import { observe } from './observer'
import Compiler from './compiler'
import { isCommonObject } from './utils'

/**
 * @name Mvvm
 * @author lizhongzhen11
 * @see 配合虚拟DOM实现的mvvm
 * @see dom写在template中，最终通过DOMParser接口生成document，然后插入到id为vm.el的div中
 * 
 * @host https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
 */

export default class Mvvm {
  constructor (vm) {
    this.el = vm.el
    this.data = observe(vm.data)
    this.template = vm.template
    this.rootNode = document.querySelector(this.el)
    this.parseTemplate()
  }
  parseTemplate () {
    let parse = new DOMParser()
    let doc = parse.parseFromString(this.template, 'text/html') // 将字符串dom转为document
    let childNodes = doc.querySelector('body').childNodes
    let fragment = document.createDocumentFragment() // 先把template对应的节点放入内存中
    for (let i = 0; i < childNodes.length; i++) {
      fragment.appendChild(childNodes[i])
    }
    this.vnode = new Vnode(fragment) // 生成vnode数据（树形结构），根节点对应#document-fragment，最终是不需要的
    // 实例化后，template对应的节点已经解析完成并且被放进页面中了
    // （这里都成为了id='root'节点的子节点），
    // 所以这里需要传入根节点即页面中id为vm.el（这里是root）的节点
    new Compiler(this.data, this.rootNode, fragment, this.vnode) 
  }
}






