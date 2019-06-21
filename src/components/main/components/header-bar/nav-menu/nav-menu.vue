<template>
  <div class="nav-menu-bar">
      <Menu mode="horizontal">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <Menu mode="horizontal" active-name="1" @on-select="handleSelect">
              <menuItem v-for="item in list" :key="`menu-${item.title}`" :name="item.request">
                  <Icon type="ios-navigate"></Icon>
                  {{item.title}}
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
</style>
