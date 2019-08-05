import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import { setToken, getToken, canTurnTo, setTitle, setRouterInLocalstorage, getRouterFromLocalstorage } from '@/libs/util'
import config from '@/config'
const { homeName } = config
var getRouter

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  console.log('turnto')
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  console.log(from, to, 888)
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    console.log('未登录且要跳转的页面不是登录页')
    store.dispatch('getPublicKey').then(user => {
      next({
        name: LOGIN_PAGE_NAME // 跳转到登录页
      })
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    console.log('未登陆且要跳转的页面是登录页')
    // 未登陆且要跳转的页面是登录页
    store.dispatch('getPublicKey').then(user => {
      next() // 跳转
    })
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    console.log('已登录且要跳转的页面是登录页')
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    console.log('已登录且要跳转的页面不是登录页')
    if (!getRouter) {
      if (!store.state.user.routes) {
        store.dispatch('getNav').then(res => {
          getRouter = res
          router.options.routes = getRouter // 必须在addroutes前，使用router.options.routes=XXXXX的方法手动添加
          router.addRoutes(getRouter) // 动态添加路由
          console.log('已经登陆跳转的不是登录页，并且没有getRouter', to.name)
          next({
            path: to.path
          })
        })
      } else {
        console.log('已经登陆跳转的不是登录页，并且有getRouter', to.name)
        getRouter = store.state.user.routes
        next()
      }
    } else {
      console.log('已经登陆跳转的不是登录页，并且有getRouter222', to.name)
      next()
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
