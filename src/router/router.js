import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'

//异步加载组件(延迟加载)----引入组件,使页面首次加载的时候更高效
const Home = () => import(/* webpackChunkName: "group-Home" */ '@/components/Home/Home')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/home"
    },
    {
      path:"/logIn",
      component:Login,
      name:"login"
    },
    {
      path:"/home",
      component:Home,
      name:"home"
    }
  ]
})
