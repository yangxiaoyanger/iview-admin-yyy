<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import { getFirstChildForMenu, setRouterInLocalstorage } from '@/libs/util'
import { constants } from 'crypto';
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo',
      'getPublicKey',
      'getNav',
      'setNavMenu',
      'setSidemenuList'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getNav().then(res => {
          const getRouter= res
          this.$router.options.routes = getRouter // 必须在addroutes前，使用router.options.routes=XXXXX的方法手动添加
          this.$router.addRoutes(getRouter) // 动态添加路由
          console.log('getRouter', getRouter)
          // setRouterInLocalstorage(getRouter)
            // global.antRouter = getRouter // 将路由数据传递给全局变量，做侧边栏菜单渲染工作
          // console.log(res.data.tree[0].request)
          // if (res.data.tree.length) {
          //   this.setNavMenu(res.data.tree[0].request)
          //   this.setSidemenuList(res.data.tree[0].request)
          // }
          console.log(this.$router, this.$config.homeName)
           this.$router.push({
            name: this.$config.homeName
          })
        })
        // this.getUserInfo().then(res => {
        //   this.$router.push({
        //     name: this.$config.homeName
        //   })
        // })
      })
    }
  }
}
</script>

<style>

</style>
