/**
 * @name Dep
 * @author lizhongzhen11
 * @see 发布订阅类
 * @see 订阅的是watcher实例对象
 */
export default class Dep {
  constructor () {
    this.subs = []
  }
  add (sub) {
    this.subs.every(s => s.parent !== sub.parent) && this.subs.push(sub)
  }
  notify () {
    this.subs.forEach(sub => sub.update())
  }
}