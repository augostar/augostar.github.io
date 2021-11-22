/**
 *
 * 
 * component 
 * title	String	用于在渲染的时候配置浏览器标题；
 * isDisableBreadcrumbLink	Boolean	是否禁用面包屑链接（对一些没有内容的路由可以屏蔽访问）；
 * isShowBreadcrumb	Boolean	是否显示面包屑（此处的登录页不需要面包屑）；
 * addToSidebar	Boolean	是否加入侧边栏（此处的登录页不需要加入侧边栏）；
 * sidebarIcon	String	配置侧边栏的图标className（默认）；
 * sidebarIconAlt	String	配置侧边栏的图标className（展开状态）；
 * isNoLogin	Boolean	是否免登录（设置为true后，会校验登录状态，此处的登录页不需要校验）；
 */
const slid = [
  {
    path: '',
    name: 'exhibition',
    component: () => import(/* webpackChunkName: "logo" */'/@/views/Home.vue'),
    meta: {
      title: '首页',
      isDisableBreadcrumbLink: true,
      isShowBreadcrumb: false,
      addToSidebar: false,
      sidebarIcon: 'ant-design:home-filled',
      sidebarIconAlt: '',
      isNoLogin: true
    }

  },

  {
    path: 'topic',
    name: 'topic',
    component: () => import(/* webpackChunkName: "logo" */'/@/views/topic/Index.vue'),
    meta: {
      title: '题目',
      isDisableBreadcrumbLink: true,
      isShowBreadcrumb: false,
      addToSidebar: false,
      sidebarIcon: 'ant-design:home-filled',
      sidebarIconAlt: '',
      isNoLogin: true
    },
    children: [
      {
        path: 'info',
        name: 'info',
        meta: {
          title: '题目列表',
          isDisableBreadcrumbLink: true,
          isShowBreadcrumb: false,
          addToSidebar: false,
          sidebarIcon: 'bx:bxl-shopify',
          sidebarIconAlt: '',
          isNoLogin: true
        },
        component: () => import(/* webpackChunkName: "Info" */'/@/views/topic/List.vue')

      }
    ]
  },

  {
    path: 'answerer',
    name: 'answerer',
    component: () => import(/* webpackChunkName: "answerer" */'/@/views/answerer/Index.vue'),
    meta: {
      title: '答题者',
      isDisableBreadcrumbLink: true,
      isShowBreadcrumb: false,
      addToSidebar: false,
      sidebarIcon: 'ant-design:home-filled',
      sidebarIconAlt: '',
      isNoLogin: true
    },
    children: [
      {
        path: 'info',
        name: 'answerer_info',
        meta: {
          title: '答题者信息',
          isDisableBreadcrumbLink: true,
          isShowBreadcrumb: false,
          addToSidebar: false,
          sidebarIcon: 'bx:bxl-shopify',
          sidebarIconAlt: '',
          isNoLogin: true
        },
        component: () => import(/* webpackChunkName: "answerer" */'/@/views/answerer/List.vue')

      }
    ]
  },

  // {
  //   path: 'goods',
  //   name: 'goods',
  //   meta: {
  //     title: '商品信息',
  //     isDisableBreadcrumbLink: true,
  //     isShowBreadcrumb: false,
  //     addToSidebar: false,
  //     sidebarIcon: 'bx:bxl-shopify',
  //     sidebarIconAlt: '',
  //     isNoLogin: true
  //   },
  //   component: () => import(/* webpackChunkName: "Info" */'/@/views/goods/Goods.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'info',
  //       meta: {
  //         title: '商品信息',
  //         isDisableBreadcrumbLink: true,
  //         isShowBreadcrumb: false,
  //         addToSidebar: false,
  //         sidebarIcon: 'bx:bxl-shopify',
  //         sidebarIconAlt: '',
  //         isNoLogin: true
  //       },
  //       component: () => import(/* webpackChunkName: "Info" */'/@/views/goods/Info.vue')

  //     },
  //     {
  //       path: 'type',
  //       name: 'type',
  //       meta: {
  //         title: '商品类型',
  //         isDisableBreadcrumbLink: true,
  //         isShowBreadcrumb: false,
  //         addToSidebar: false,
  //         sidebarIcon: 'bx:bxl-shopify',
  //         sidebarIconAlt: '',
  //         isNoLogin: true
  //       },
  //       component: () => import(/* webpackChunkName: "Info" */'/@/views/goods/GoodsType.vue')
  //     },
  //     {
  //       path: 'order',
  //       name: 'order',
  //       meta: {
  //         title: '商品订单',
  //         isDisableBreadcrumbLink: true,
  //         isShowBreadcrumb: false,
  //         addToSidebar: false,
  //         sidebarIcon: 'bx:bxl-shopify',
  //         sidebarIconAlt: '',
  //         isNoLogin: true
  //       },
  //       component: () => import(/* webpackChunkName: "Order" */'/@/views/goods/Order.vue')

  //     },
  //     {
  //       path: 'programme',
  //       name: 'programme',
  //       meta: {
  //         title: '报价方案',
  //         isDisableBreadcrumbLink: true,
  //         isShowBreadcrumb: false,
  //         addToSidebar: false,
  //         sidebarIcon: 'bx:bxl-shopify',
  //         sidebarIconAlt: '',
  //         isNoLogin: true
  //       },
  //       component: () => import(/* webpackChunkName: "Order" */'/@/views/goods/Programme.vue')

  /*
   *     }
   *   ]
   */

  // },

  // {
  //   path: 'ui',
  //   name: 'UI',
  //   component: () => import(/* webpackChunkName: "ui" */'/@/views/UI/Index.vue'),
  //   meta: {
  //     title: 'ui',
  //     isDisableBreadcrumbLink: true,
  //     isShowBreadcrumb: false,
  //     addToSidebar: false,
  //     sidebarIcon: 'healthicons:ui-menu-grid-outline',
  //     sidebarIconAlt: '',
  //     isNoLogin: true
  //   },
  //   children: [
  //     {
  //       path: 'icon',
  //       name: 'icon',
  //       component: () => import(/* webpackChunkName: "ui" */'/@/views/UI/Icon.vue'),
  //       meta: {
  //         title: 'icon 图标',
  //         isDisableBreadcrumbLink: true,
  //         isShowBreadcrumb: false,
  //         addToSidebar: false,
  //         sidebarIcon: 'healthicons:ui-menu-grid-outline',
  //         sidebarIconAlt: '',
  //         isNoLogin: true
  //       }
  //     }, {
  //       path: 'table',
  //       name: 'table',
  //       component: () => import(/* webpackChunkName: "ui" */'/@/views/UI/Table.vue'),
  //       meta: {
  //         title: 'table 表格',
  //         isDisableBreadcrumbLink: true,
  //         isShowBreadcrumb: false,
  //         addToSidebar: false,
  //         sidebarIcon: 'healthicons:ui-menu-grid-outline',
  //         sidebarIconAlt: '',
  //         isNoLogin: true
  //       }
  //     }
  //   ]
  // },
  {
    path: 'about',
    name: 'about',
    component: () => import(/* webpackChunkName: "logo" */'/@/views/About.vue'),
    meta: {
      title: '关于我们',
      isDisableBreadcrumbLink: true,
      isShowBreadcrumb: false,
      addToSidebar: false,
      sidebarIcon: 'cib:about-me',
      sidebarIconAlt: '',
      isNoLogin: true
    }
  }

];


export default slid;