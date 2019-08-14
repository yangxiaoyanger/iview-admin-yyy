<template>
  <div class="header-bar">
    <div class="logo">
      {{title}}
    </div>
    <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <!-- <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
        </div> -->
    <!-- <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb> -->
    <div class="custom-content-con">
      <slot></slot>
      <nav-menu :list="navMenuList" @on-select="selectNav" :active-name="navMenu"></nav-menu>
      
    </div>
  </div>
</template>
<script>
import NavMenu from './nav-menu'
import './header-bar.less'
import { mapActions } from 'vuex'
import { constants } from 'crypto';
export default {
  name: 'HeaderBar',
  components: {
    NavMenu
  },
  props: {
    
  },
  computed: {
    title () {
      return this.$store.state.app.title
    },
    navMenuList() {
      return this.$store.getters.menuList
    },
    navMenu () {
      console.log(this.$store.getters.navMenu)
      return this.$store.getters.navMenu
    },
  },
  methods: {
     ...mapActions([
      'setNavMenu'
    ]),
    selectNav (name) {
      this.$emit('on-select', name)
    }    
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    const navName = this.$route.matched.map(item => item.name).filter(item => item !== name)[0]
    console.log(navName, 1111111111)
    this.setNavMenu(navName)
  }
}
</script>
