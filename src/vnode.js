/**
 * @name Vnode
 * @author lizhongzhen11
 * @see 将DOM节点转为vnode数据格式
 */
export default class Vnode {
  constructor (node) {
    this.type = node.nodeType // 11代表DocumentFragment节点，3代表文字节点，1代表元素节点
    this.nodeName = node.nodeName // DIV, INPUT, TEXTAREA...
    this.props = {} // 缓存节点所有的属性，包括value等
    this.children = [] // 缓存子节点
    if (this.type !== 11) {
      if (node.style.cssText) {
        this.props.style = node.style.cssText
      }
      if (node.classList.length) {
        this.props.class = Array.from(node.classList).join(',')
      }
      if (this.nodeName === 'INPUT' || this.nodeName === 'TEXTAREA') {
        this.props.value = node.value
      }
    }
    Array.from(node.childNodes).forEach(child => {
      child.nodeType === 3 ? this.children.push(child.nodeValue) : this.children.push(new Vnode(child))
    })
  }
}



// 生成的数据结构例如：
// {
//   type: 11,
//   nodeName: '#document-fragment',
//   props: {},
//   children: [
//     {
//       type: 1,
//       nodeName: 'DIV',
//       props: {},
//       children: [
//         {
//           type: 1,
//           nodeName: 'H1',
//           props: {},
//           children: [
//             '姓名：{{name}}'
//           ]
//         },
//         {
//           type: 1,
//           nodeName: 'H2',
//           props: {},
//           children: [
//             '战友：{{friends[0]}}，{{friends[1]}}，{{friends[2]}}'
//           ]
//         },
//         {
//           type: 1,
//           nodeName: 'P',
//           props: {},
//           children: [
//             '{{detail.desc}}'
//           ]
//         },
//         {
//           type: 1,
//           nodeName: 'P',
//           props: {},
//           children: [
//             '{{detail.martialArts}}'
//           ]
//         },
//         {
//           type: 1,
//           nodeName: 'UL',
//           props: {},
//           children: [
//             {
//               type: 1,
//               nodeName: 'LI',
//               props: {},
//               children: [
//                 '{{detail.record.a}}'
//               ]
//             },
//             {
//               type: 1,
//               nodeName: 'LI',
//               props: {},
//               children: [
//                 '{{detail.record.b}}'
//               ]
//             },
//             {
//               type: 1,
//               nodeName: 'LI',
//               props: {},
//               children: [
//                 '{{detail.record.c}}'
//               ]
//             },
//             {
//               type: 1,
//               nodeName: 'LI',
//               props: {},
//               children: [
//                 '{{detail.record.d}}'
//               ]
//             },
//             {
//               type: 1,
//               nodeName: 'LI',
//               props: {},
//               children: [
//                 '{{detail.record.e}}'
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }