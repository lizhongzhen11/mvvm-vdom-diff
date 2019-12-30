import Dep from './dep'
import { isObject } from './utils'

/**
 * @name Observer
 * @author lizhongzhen11
 * @see 对data进行数据监听，get内订阅，set内发布更新
 * 
 * @see 不应该在get内递归调用observe，不然会重新实例化新的Observer，导致Dep为空
 */
export class Observer {
  constructor (data) {
    this.data = data
    this.dep = new Dep
    Object.keys(this.data).forEach(key => {
      this.data[key] = observe(this.data[key])
    })
    return this.proxy()
  }
  proxy () {
    let self = this
    return new Proxy(self.data, {
      get (target, key) {
        Dep.target && self.dep.add(Dep.target)
        return target[key]
      },
      set (target, key, value) {
        if (target[key] === value) {
          return true
        }
        target[key] = observe(value)
        self.dep.notify()
        return true
      }
    })
  }
}

export const observe = (obj) => {
  if (isObject(obj)) {
    return new Observer(obj)
  }
  return obj
}