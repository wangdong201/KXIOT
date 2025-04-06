/**
 * v-hasPermi 操作权限处理
 * Copyright (c) 2019 kxiot
 */

import store from '@/store'

export default {
  // 插入元素时执行的钩子函数
  inserted(el, binding, vnode) {
    const { value } = binding
    const all_permission = "*:*:*";
    const permissions = store.getters && store.getters.permissions

    // 检查传入的权限值是否有效
    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value

      // 检查当前用户是否有权限
      const hasPermissions = permissions.some(permission => {
        return all_permission === permission || permissionFlag.includes(permission)
      })

      // 如果没有权限，移除元素
      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
