/**
 * v-hasRole 角色权限处理
 * Copyright (c) 2019 kxiot
 */

import store from '@/store'

export default {
  // 插入元素时的钩子函数，用于处理角色权限
  inserted(el, binding, vnode) {
    const { value } = binding
    const super_admin = "admin";
    const roles = store.getters && store.getters.roles

    // 检查传入的值是否为数组且长度大于0
    if (value && value instanceof Array && value.length > 0) {
      const roleFlag = value

      // 检查当前用户是否有指定的角色权限
      const hasRole = roles.some(role => {
        return super_admin === role || roleFlag.includes(role)
      })

      // 如果没有权限，则移除元素
      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      // 如果未设置角色权限标签值，抛出错误
      throw new Error(`请设置角色权限标签值"`)
    }
  }
}
