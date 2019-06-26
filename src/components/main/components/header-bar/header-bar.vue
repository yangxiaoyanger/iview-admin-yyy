<template>
  <div class="header-bar">
    <nav-menu :list="navMenuList" @on-select="selectNav" :active-name="$store.state.app.navMenu"></nav-menu>
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
      return this.$store.getters.menulist
    }
  },
  methods: {
    selectNav (name) {
      console.log(name, 'handleselect')
      this.$emit('on-select', name)
    }


    // turnToPage (route) {
    //   console.log(route, 'route hader-bar')
    //   let { name, params, query } = {}
    //   if (typeof route === 'string') name = route
    //   else {
    //     name = route.name
    //     params = route.params
    //     query = route.query
    //   }
    //   if (name.indexOf('isTurnByHref_') > -1) {
    //     window.open(name.split('_')[1])
    //     return
    //   }
    //   this.$router.push({
    //     name,
    //     params,
    //     query
    //   })
    // }
    
  }
}
</script>
