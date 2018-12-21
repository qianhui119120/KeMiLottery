import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'

//引入全局工具axios
import './tools/axios'
import './registerServiceWorker'

//引入elementui文件和样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import 'reset-css'

Vue.config.productionTip = false
// console.log(process.env)

//设置登陆的全局路由守卫
router.beforeEach((to,from,next)=>{
  if (to.path == '/logIn') {
    //如果用户跳转到到登陆页面,清除当前用户数据
    //这里只清除token,还有用户选择记住密码需要保存
    localStorage.removeItem('token');
    next();
  }else{
    //获取token,如果token存在,表示用户已经登陆,直接放行
    const token = localStorage.getItem('token');
      if (token) {
        next();
      }else{
      // 如果没有token,则跳转到登陆页面,登录验证完成后跳转到用户需要去的页面
        next({path:"/logIn",query:{redirect:to.path}})
      }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
