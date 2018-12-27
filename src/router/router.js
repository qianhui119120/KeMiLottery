import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'

//异步加载组件(延迟加载)----引入组件,使页面首次加载的时候更高效
const Home = () => import(/* webpackChunkName: "Home" */ '@/components/Home/Home')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/home/System"
    },
    {
      path:"/logIn",
      component:Login,
      name:"login"
    },
    {
      path:"/home",
      component:Home,
      name:"home",
      children:[
        {
          path:'System',
          component: () => import(/* webpackChunkName: "System" */ '@/components/System/System'),
          name:'系统管理',
          children:[
            {
              path:'permissionManage',
              component:() => import(/* webpackChunkName: "permissionManage" */ '@/components/System/permissionManage'),
              name:'权限管理'
            },
            {
              path:'roleManage',
              component:() => import(/* webpackChunkName: "roleManage" */ '@/components/System/roleManage'),
              name:'角色管理'
            },
            {
              path:'accountManage',
              component:() => import(/* webpackChunkName: "accountManage" */ '@/components/System/accountManage'),
              name:'用户管理',
              children:[
                {
                  path:"addNewAccount",
                  component:() => import(/* webpackChunkName: "addNewAccount" */ '@/components/System/accountManage/addNewAccount'),
                  name:"新增用户"
                }
              ]
            },
          ]
        },
        {
          path:'Advertment',
          component:  () => import(/* webpackChunkName: "Advertment" */ '@/components/Advertment/Advertment'),
          name:'广告管理'
        },
        {
          path:'Lottery',
          component:  () => import(/* webpackChunkName: "Lottery" */ '@/components/Lottery/Lottery'),
          name:'彩票管理',
          children: [
            {
              path:'LotteryList',
              component:  () => import(/* webpackChunkName: "LotteryList" */ '@/components/Lottery/LotteryList'),
              name:'彩票列表'
            }
          ]
        }
      ]
    }
  ]
})
