<template>
  <Layout style="height: 100%" class="main">
    <Header class="header-con">
      <header-bar @on-select="selectNav">
        <user :message-unread-count="unreadCount" :user-avatar="userAvatar"/>
        <language v-if="$config.useI18n" @on-lang-change="setLocal" :lang="local"/>
        <!-- <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount"></error-store> -->
        <fullscreen v-model="isFullscreen"/>
      </header-bar>
    </Header>
    <Layout>
        <Sider v-show="sidemenuList.length > 0"  hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
        <side-menu  @on-coll-change="handleCollapsedChange" accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="sidemenuList">

        </side-menu>
      </Sider>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <!-- <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div> -->
          <custom-bread-crumb show-icon v-show="sidemenuList.length > 0" :list="breadCrumbList"></custom-bread-crumb>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>
    <!-- <Footer class="layout-footer-center" v-html="bottom_copyright"></Footer> -->
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import customBreadCrumb from './components/custom-bread-crumb'
// import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import ErrorStore from './components/error-store'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getNewTagList, routeEqual, getFirstChildForMenuByRequest } from '@/libs/util'
import routers from '@/router/routers'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'
import './main.less'
import { constants } from 'crypto';
import { stat } from 'fs';
import navMenuVue from './components/header-bar/nav-menu/nav-menu.vue';
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    customBreadCrumb,
    Language,
    // TagsNav,  // 去掉标签导航
    Fullscreen,
    ErrorStore,
    User,
    ABackTop
  },
  data () {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false
    }
  },
  computed: {
    ...mapGetters([
      'errorCount'
    ]),
    // 标签导航暂时去掉
    bottom_copyright () {
      return this.$store.state.app.bottom_copyright
    },
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    },
    sidemenuList () {
      return this.$store.getters.sidemenuList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvatar () {
      return this.$store.state.user.avatarImgPath
    },
    cacheList () {
      // 去掉标签导航
      // const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
      const list = ['ParentView']
      return list
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    },
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    },
    unreadCount () {
      return this.$store.state.user.unreadCount
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      // 'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute',
      'closeTag',
      'setSidemenuList'
    ]),
    ...mapActions([
      'handleLogin',
      'getUnreadMessageCount',
      'setNavMenu',
      'setSidemenuList'
    ]),
    selectNav (name) {
      this.setNavMenu(name)
      this.setSidemenuList(name)
      this.$router.push({
        name: getFirstChildForMenuByRequest(this.$store.getters.routes, name).name
      })
    },
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    // 关闭标签导航
    // handleCloseTag (res, type, route) {
    //   if (type !== 'others') {
    //     if (type === 'all') {
    //       this.turnToPage(this.$config.homeName)
    //     } else {
    //       if (routeEqual(this.$route, route)) {
    //         this.closeTag(route)
    //       }
    //     }
    //   }
    //   this.setTagNavList(res)
    // },
    // 点击标签导航
    // handleClick (item) {
    //   this.turnToPage(item)
    // }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      
      const navName = this.$route.matched.map(item => item.name).filter(item => item !== name)[0]
      this.setNavMenu(navName)
      this.setSidemenuList(navName)
      this.setBreadCrumb(newRoute)
      // this.setTagNavList(getNewTagList(this.tagNavList, newRoute))  // 暂时去掉标签导航
      this.$refs.sideMenu.updateOpenName(newRoute.name)
      
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    // this.setTagNavList()  // 先去掉标签导航
    this.setHomeRoute(this.$store.getters.routes)
    const { name, params, query, meta } = this.$route
    this.addTag({
      route: { name, params, query, meta }
    })
    const navName = this.$route.matched.map(item => item.name).filter(item => item !== name)[0]
    this.setNavMenu(navName)
    this.setSidemenuList(navName)
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    // if (!this.tagNavList.find(item => item.name === this.$route.name)) {
    //   this.$router.push({
    //     name: this.$config.homeName
    //   })
    // }
    // 获取未读消息条数
    this.getUnreadMessageCount()
  }
}
</script>
