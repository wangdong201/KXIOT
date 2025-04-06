import hasRole from './permission/hasRole' // 导入角色权限检查指令
import hasPermi from './permission/hasPermi' // 导入权限检查指令
import dialogDrag from './dialog/drag' // 导入对话框拖动指令
import dialogDragWidth from './dialog/dragWidth' // 导入对话框宽度拖动指令
import dialogDragHeight from './dialog/dragHeight' // 导入对话框高度拖动指令
import clipboard from './module/clipboard' // 导入剪贴板指令

const install = function(Vue) { // 定义Vue插件安装函数
  Vue.directive('hasRole', hasRole) // 注册角色权限检查指令
  Vue.directive('hasPermi', hasPermi) // 注册权限检查指令
  Vue.directive('clipboard', clipboard) // 注册剪贴板指令
  Vue.directive('dialogDrag', dialogDrag) // 注册对话框拖动指令
  Vue.directive('dialogDragWidth', dialogDragWidth) // 注册对话框宽度拖动指令
  Vue.directive('dialogDragHeight', dialogDragHeight) // 注册对话框高度拖动指令
}

if (window.Vue) { // 检查全局是否存在Vue实例
  window['hasRole'] = hasRole // 将角色权限检查指令挂载到window对象
  window['hasPermi'] = hasPermi // 将权限检查指令挂载到window对象
  Vue.use(install); // eslint-disable-line // 使用安装函数
}

export default install // 导出安装函数
