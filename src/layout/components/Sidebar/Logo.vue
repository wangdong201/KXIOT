<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}" :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuBackground }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :vvv="theme" :src="theme!='#13C2C2'||theme==='#11A983'?logo3:logo" class="sidebar-logo" />
        <h1 v-else class="sidebar-title" :style="{ color: sideTheme === 'theme-dark' ? theme : theme }">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :vvv1="theme" :src="theme!='#13C2C2'||theme==='#11A983'?logo3:logo" class="sidebar-logo" />
        <h1 class="sidebar-title" >{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import logoImg from '@/assets/logo/logo.png'
import logoImg3 from '@/assets/logo/logo3.png'
import variables from '@/assets/styles/variables.scss'
// <img v-if="logo" :vvv1="theme" :src="theme==='#13C2C2'||theme==='#11A983'?logo3:logo" class="sidebar-logo" />
//<img v-if="logo" :vvv="theme" :src="theme==='#13C2C2'||theme==='#11A983'?logo3:logo" class="sidebar-logo" />
//<h1 class="sidebar-title" :style="{ color: sideTheme === 'theme-dark' ? theme : variables.logoLightTitleColor }">{{ title }} </h1>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    variables() {
      return variables;
    },
    sideTheme() {
      return this.$store.state.settings.sideTheme
    }, theme() {
      return this.$store.state.settings.theme
    }
  },
  data() {
    return {
      title: '能耗管理系统',
      logo:logoImg,
      logo3:logoImg3
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 2px;
      margin-left: 0px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #1296db;
      color: #fff;
      font-weight: 50;
      line-height: 50px;
      font-size: 20px;
      font-family:楷体,Avenir, Helvetica Neue, Arial,Microsoft YaHei, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
