// 引入需要的组件与方法
import { createVNode, render } from 'vue'
import Toast from './Toast.vue'

// 创建一个 dom 容器节点
const div = document.createElement('div')
// 为 dom 添加一个唯一的标识，无实质功能
div.setAttribute('class', 'toast-container')
// 容器追加到 body 中
document.body.appendChild(div)

// 定时器标识
let timer = null
// 未来使用函数需要传入的组件 props 属性
export default ({type, message}) => {
  // 将组件编译为虚拟 dom 节点
  const vnode = createVNode(Toast, {type, message})
  // 将虚拟 dom 添加到 div 容器中
  render(vnode, div)
  // 必要步骤完成后，以下为关闭消息提示的定时器功能
  clearInterval(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}