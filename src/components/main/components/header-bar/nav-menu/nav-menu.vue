<template>
  <div class="nav-menu-bar">
      <Menu mode="horizontal">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <Menu mode="horizontal" @on-select="handleSelect">
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
    }
  },
  methods: {
    handleSelect (name) {
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
</style>
