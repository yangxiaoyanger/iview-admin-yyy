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
            hideInBread: true
          },
          children: [
            {
              path: '/home',
              name: 'home',
              meta: {
                hideInMenu: true,
                title: '首页',
                notCache: true,
                icon: 'md-home',
                hideInBread: true
              },
              component: 'single-page/home'
            }
          ]
        },
        {
          path: 'basicinfo',
          name: 'basicinfo',
          component: 'Main',
          meta: {
            hideInMenu: true,
            notCache: true
          },
          children: [{
            path: 'urban',
            name: 'urban',
            meta: {
              hideInMenu: true,
              notCache: true,
              title: '城市基础信息'
            },
            children: [
              {
                path: 'urbanbase',
                name: 'urbanbase',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '城市供水基础信息'
                },
                // eslint-disable-next-line no-dupe-keys
                component: 'components/demotable/demotable'
              },
              {
                path: 'secondarywater',
                name: 'secondarywater',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '二次供水基础信息'
                },
                // eslint-disable-next-line no-dupe-keys
                component: 'components/demotable/demotable'
              }
            ]
          },
          {
            path: 'waterworksbase',
            name: 'waterworksbase',
            meta: {
              icon: 'md-arrow-dropdown-circle',
              title: '水厂基础信息'
            },
            // eslint-disable-next-line no-dupe-keys
            component: 'components/demotable/demotable'
          }]
        },
        {
          path: 'realtimemonitor',
          name: 'realtimemonitor',
          component: 'Main',
          meta: {
            hideInMenu: true,
            notCache: true,
            title: '实时监控'
          },
          children: [{
            path: 'watersoumonit',
            name: 'watersoumonit',
            meta: {
              icon: 'md-arrow-dropdown-circle',
              title: '水源水监控'
            },
            children: [
              {
                path: 'watersourealtimemonit',
                name: 'watersourealtimemonit',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '水源水实时监控'
                },
                component: 'join-page'
              },
              {
                path: 'querymonitdata',
                name: 'querymonitdata',
                meta: {
                  icon: 'md-arrow-dropdown-circle',
                  title: '监控数据查询'
                },
                // eslint-disable-next-line no-dupe-keys
                component: 'single-page/message/index'
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
              name: 'tree_select_page',
              meta: {
                icon: 'md-arrow-dropdown-circle',
                title: '树状下拉选择器'
              },
              component: 'components/tree-select/index'
            },
            {
              path: 'count_to_page',
              name: 'count_to_page',
              meta: {
                icon: 'md-trending-up',
                title: '数字渐变'
              },
              component: 'components/count-to/count-to'
            },
            {
              path: 'drag_list_page',
              name: 'drag_list_page',
              meta: {
                icon: 'ios-infinite',
                title: '拖拽列表'
              },
              component: 'components/drag-list/drag-list'
            }
          ]
        }
        
        // {
        //   "path": "/",
        //   "component": "Main",
        //   "redirect": "/home",
        //   "children": [
        //     {
        //       "path": "dashboard",
        //       "component": "dashboard/index",
        //       "meta": {
        //         "title": "首页",
        //         "icon": "dashboard"
        //       }
        //     }
        //   ]
        // },
        // {
        //   "path": "/example",
        //   "component": "Main",
        //   "redirect": "/example/table",
        //   "name": "Example",
        //   "meta": {
        //     "title": "案例",
        //     "icon": "example"
        //   },
        //   "children": [
        //     {
        //       "path": "table",
        //       "name": "Table",
        //       "component": "table/index",
        //       "meta": {
        //         "title": "表格",
        //         "icon": "table"
        //       }
        //     },
        //     {
        //       "path": "tree",
        //       "name": "Tree",
        //       "component": "tree/index",
        //       "meta": {
        //         "title": "树形菜单",
        //         "icon": "tree"
        //       }
        //     }
        //   ]
        // },
        // {
        //   "path": "/form",
        //   "component": "Main",
        //   "children": [
        //     {
        //       "path": "index",
        //       "name": "Form",
        //       "component": "form/index",
        //       "meta": {
        //         "title": "表单",
        //         "icon": "form"
        //       }
        //     }
        //   ]
        // },
        // {
        //   "path": "*",
        //   "redirect": "/404",
        //   "hidden": true
        // }
      ]
    }
  }
  return result
}
