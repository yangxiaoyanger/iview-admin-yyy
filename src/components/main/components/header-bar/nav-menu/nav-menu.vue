<template>
  <div class="nav-menu-bar">
      <Menu mode="horizontal">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <template  v-for="item in list">
              <MenuItem :key="`menu-${item.name}`" >
                  <Icon type="ios-navigate"></Icon>
                  {{item.name}}
              </MenuItem>
            </template>
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
