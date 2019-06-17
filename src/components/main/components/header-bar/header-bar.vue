<template>
  <div class="header-bar">
    <nav-menu :list="navMenuList"></nav-menu>
    <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <!-- <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
        </div> -->
    <!-- <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb> -->
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import NavMenu from './nav-menu'
import './header-bar.less'
import { constants } from 'crypto';
export default {
  name: 'HeaderBar',
  components: {
    NavMenu
  },
  props: {
    
  },
  computed: {
    navMenuList() {
      console.log(this.$store.getters.navMenuList)
      return this.$store.getters.navMenuList
    }
  },
  methods: {
    
  }
}
</script>
