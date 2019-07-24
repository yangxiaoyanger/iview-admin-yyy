<template>
  <div class="nav-menu-bar">
      <Menu mode="horizontal">
          <div class="layout-nav">
            <Menu ref="navmenu" mode="horizontal" :active-name="activeName" @on-select="handleSelect">
              <menuItem v-for="item in list" :key="`menu-${item.name}`" :name="item.name">
                  <Icon type="ios-navigate"></Icon>
                  {{ showTitle(item) }}
              </MenuItem>
            </Menu>
          </div>
      </Menu>
  </div>
</template>
<script>
import { showTitle } from '@/libs/util'
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
      this.$emit('on-select', name)
    },
    showTitle (item) {
      return showTitle(item, this)
    }
  },
  computed: {
  },
  watch: {
    // activeName (name) {
    //    console.log('activeName', name)
    //   this.$nextTick(() => {
    //     this.$refs.navmenu.updateActiveName()
    //   })
    // }
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
