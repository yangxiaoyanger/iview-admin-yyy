<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" :title="title" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入用户名和密码</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions, Store } from 'vuex'
import { getFirstChildForMenu, setRouterInLocalstorage } from '@/libs/util'
import { constants } from 'crypto';
export default {
  computed: {
    title () {
      return this.$store.state.app.title
    },
  },
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
          this.setNavMenu(getRouter[0].name)
          this.setSidemenuList(getRouter[0].name)
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    }
  }
}
</script>

<style>

</style>
