import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

export const getMessageInit = () => {
  let unreadList = []
  doCustomTimes(3, () => {
    unreadList.push(Mock.mock({
      title: Random.cword(10, 15),
      create_time: '@date',
      msg_id: Random.increment(100)
    }))
  })
  let readedList = []
  doCustomTimes(4, () => {
    readedList.push(Mock.mock({
      title: Random.cword(10, 15),
      create_time: '@date',
      msg_id: Random.increment(100)
    }))
  })
  let trashList = []
  doCustomTimes(2, () => {
    trashList.push(Mock.mock({
      title: Random.cword(10, 15),
      create_time: '@date',
      msg_id: Random.increment(100)
    }))
  })
  return {
    unread: unreadList,
    readed: readedList,
    trash: trashList
  }
}

export const getContentByMsgId = () => {
  return `<divcourier new',="" monospace;font-weight:="" normal;font-size:="" 12px;line-height:="" 18px;white-space:="" pre;"=""><div>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: medium;">这是消息内容，这个内容是使用<span style="color: rgb(255, 255, 255); background-color: rgb(28, 72, 127);">富文本编辑器</span>编辑的，所以你可以看到一些<span style="text-decoration-line: underline; font-style: italic; color: rgb(194, 79, 74);">格式</span></span></div><ol><li>你可以查看Mock返回的数据格式，和api请求的接口，来确定你的后端接口的开发</li><li>使用你的真实接口后，前端页面基本不需要修改即可满足基本需求</li><li>快来试试吧</li></ol><p>${Random.csentence(100, 200)}</p></divcourier>`
}

export const hasRead = () => {
  return true
}

export const removeReaded = () => {
  return true
}

export const restoreTrash = () => {
  return true
}

export const messageCount = () => {
  return 3
}

export const getNav = () => {
  const result = {
    data: {
      router: [
        {
          path: '/',
          name: '_home',
          component: 'Main',
          // redirect: '/home',
          meta: {
            icon: 'md-home',
            title: '首页'
          },
          children: [
            {
              path: '/',
              name: 'home',
              meta: {
                icon: 'logo-buffer',
                title: '首页'
              },
              component: 'single-page/home'
            }
          ]
        },
        {
          path: '/systemmng',
          name: 'systemmng',
          component: 'Main',
          meta: {
            icon: 'logo-buffer',
            title: '平台管理'
          },
          children: [{
            path: 'systembasicmng',
            name: 'systembasicmng',
            meta: {
              icon: 'logo-buffer',
              title: '基础设置管理'
            },
            component: 'parentView',
            children: [
              {
                path: 'systemcode',
                name: 'systemcode',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '全局代码'
                },
                component: 'system/systemcode/systemcode.vue'
              },
              {
                path: 'systemparameter',
                name: 'systemparameter',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '全局参数'
                },
                component: 'system/systemparameter.vue'
              }
            ]
          }, {
            path: 'systemauthorizemng',
            name: 'systemauthorizemng',
            meta: {
              icon: 'logo-buffer',
              title: '权限管理'
            },
            component: 'parentView',
            children: [
              {
                path: 'systemdepartment',
                name: 'systemdepartment',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '机构管理'
                },
                component: 'system/systemdepartment.vue'
              },
              {
                path: 'systemuser',
                name: 'systemuser',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '人员管理'
                },
                component: 'system/systemuser.vue'
              },
              {
                path: 'systemrole',
                name: 'systemrole',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '角色管理'
                },
                component: 'system/systemrole.vue'
              },
              {
                path: 'systemmenu',
                name: 'systemmenu',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '资源权限管理'
                },
                component: 'system/systemmenu.vue'
              }
            ]
          },
          {
            path: 'systemmonitormng',
            name: 'systemmonitormng',
            meta: {
              icon: 'logo-buffer',
              title: '平台监控管理'
            },
            component: 'parentView',
            children: [
              {
                path: 'systemevent',
                name: 'systemevent',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '系统审计日志'
                },
                component: 'components/demotable/demotable'
              },
              {
                path: 'systemexception',
                name: 'systemexception',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '系统异常日志'
                },
                component: 'components/tree-select/index.vue'
              },
              {
                path: 'msmonitor',
                name: 'msmonitor',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '微服务监控管理'
                },
                component: 'components/tree-select/index.vue'
              }
            ]
          }]
        },
        {
          path: '/components',
          name: 'components',
          meta: {
            icon: 'logo-buffer',
            title: '其他组件'
          },
          component: 'Main',
          children: [
            {
              path: 'tree_select_page',
              name: '_tree_select_page',
              meta: {
                icon: 'logo-buffer',
                title: '组件列表'
              },
              component: 'parentView',
              children: [
                {
                  path: 'tree_select_page2',
                  name: 'Markdown编辑器',
                  meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '树状下拉选择器'
                  },
                  component: 'components/markdown/markdown.vue'
                },
                {
                  path: 'tree_select_page3',
                  name: 'tree_select_page3',
                  meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '自定义图标'
                  },
                  component: 'components/icons/icons.vue'
                },
                {
                  path: 'demotable',
                  name: 'demotable',
                  meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '列表'
                  },
                  component: 'components/demotable/demotable.vue'
                }
              ]
            },
            {
              path: 'count_to_page',
              name: '_count_to_page',
              component: 'parentView',
              children: [
                {
                  path: 'count_to_page2',
                  name: 'count_to_page',
                  meta: {
                    icon: 'md-trending-up',
                    title: '数字渐变'
                  },
                  component: 'components/count-to/count-to'
                }
              ]
            },
            {
              path: 'drag_list_page',
              name: '_drag_list_page',
              component: 'parentView',
              children: [
                {
                  path: 'drag_list_page2',
                  name: 'drag_list_page',
                  meta: {
                    icon: 'ios-infinite',
                    title: '拖拽列表'
                  },
                  component: 'components/drag-list/drag-list'
                }
              ]
            },
            {
              path: 'tables',
              name: 'tables',
              component: 'parentView',
              children: [
                {
                  path: 'tables2',
                  name: 'tables',
                  meta: {
                    icon: 'ios-infinite',
                    title: '多功能列表'
                  },
                  component: 'components/tables/tables.vue'
                }
              ]
            }
          ]
        }
      ]
    }
  }
  return result
}
