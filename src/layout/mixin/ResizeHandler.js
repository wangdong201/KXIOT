import store from '@/store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route(route) {
      // 监听路由变化，如果是移动设备且侧边栏打开状态，则关闭侧边栏
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    // 在组件挂载前添加窗口大小变化事件监听器
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    // 在组件销毁前移除窗口大小变化事件监听器
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    // 在组件挂载后检查设备类型并进行相应处理
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // 检查设备是否为移动设备
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    // 处理窗口大小变化事件
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
