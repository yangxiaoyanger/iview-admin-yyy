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
          redirect: '/home',
          meta: {
            hideInMenu: true,
            notCache: true,
            icon: 'md-home',
            title: '首页',
            hideInBread: true
          },
          children: [
            {
              path: '/home',
              name: 'home',
              meta: {
                icon: 'logo-buffer',
                title: '首页',
                showAlways: false
              },
              component: 'single-page/home'
            }
          ]
        },
        {
          path: '/basicinfo',
          name: 'basicinfo',
          component: 'Main',
          meta: {
            icon: 'logo-buffer',
            hideInMenu: true,
            notCache: true,
            title: '基础信息'
          },
          children: [{
            path: 'urban',
            name: 'urban',
            meta: {
              icon: 'logo-buffer',
              title: '城市基础信息'
            },
            component: 'parentView',
            children: [
              {
                path: 'urbanbase',
                name: 'urbanbase',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '城市供水基础信息'
                },
                component: 'components/demotable/demotable'
              },
              {
                path: 'secondarywater',
                name: 'secondarywater',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '二次供水基础信息'
                },
                component: 'components/tree-select/index.vue'
              }
            ]
          },
          {
            path: 'waterworksbase',
            name: '_waterworksbase',
            component: 'parentView',
            children: [
              {
                path: 'waterworksbase2',
                name: 'waterworksbase',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '水厂基础信息'
                },
                component: 'components/org-tree'
              }
            ]
          }]
        },
        {
          path: '/components',
          name: 'components',
          meta: {
            icon: 'logo-buffer',
            title: '组件'
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
            }
          ]
        },
        {
          path: '/realtimemonitor',
          name: 'realtimemonitor',
          meta: {
            icon: 'logo-buffer',
            title: '实时监控'
          },
          component: 'Main',
          children: [
            {
              path: 'watersourealtimemonit',
              name: '_watersourealtimemonit',
              component: 'parentView',
              children: [
                {
                  path: 'watersourealtimemonit2',
                  name: 'watersourealtimemonit',
                  meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: 'QQ群'
                  },
                  component: 'join-page'
                }
              ]
            },
            {
              path: 'querymonitdata',
              name: '_querymonitdata',
              redirect: '/querymonitdata',
              component: 'parentView',
              children: [
                {
                  path: 'querymonitdata2',
                  name: 'querymonitdata',
                  meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '消息中心'
                  },
                  component: 'single-page/message/index'
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
