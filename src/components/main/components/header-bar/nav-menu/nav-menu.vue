<template>
  <div class="nav-menu-bar">
      <Menu mode="horizontal">
          <div class="logo">
            城镇供水全过程监管业务平台
          </div>
          <div class="layout-nav">
            <Menu mode="horizontal" :active-name="activeName" @on-select="handleSelect">
              <menuItem v-for="item in list" :key="`menu-${item.menuid}`" :name="item.request">
                  <Icon type="ios-navigate"></Icon>
                  {{item.menuname}}
              </MenuItem>
            </Menu>
          </div>
      </Menu>
  </div>
</template>
<script>

export default {
  name: 'NavMenu',
  components: {
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    activeName: {
      type: String,
      default: ''
    },
  },
  methods: {
    handleSelect (name) {
      console.log(name, 'handleselect')
      this.$emit('on-select', name)
    },
  },
  computed: {
  },
  watch: {
    
  },
  mounted () {
    
  }
}
</script>
<style lang="less">
@import './nav-menu.less';
.logo {
    float: left;
    font-size: 20px;
    font-weight: normal;
    color: cornflowerblue;
    font-family: "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;
}
</style>
