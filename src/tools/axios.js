import Vue from 'vue'
import axios from 'axios'
//配置基础路径,该路径会根据运行的环境不同,自动更新
//开发环境:.env.development里面的url
//生产环境:.env.production里面的url
axios.defaults.baseURL = process.env.VUE_APP_baseURL;
//请求拦截器,在前端发起请求到服务器的道路上,
//服务器会对前端发球的请求进行拦截,
//拦截可以给请求带上我们想要带的数据,或者二次处理,再上传
axios.interceptors.request.use(function (config) {
    //将token放到请求头内,发起请求的时候一起带给后台
        const token = localStorage.getItem('token');
        // 设置token,检查用户的登录状态
        //在main.js里面查看详情
        config.headers.common['Authorizaition'] = 'Bearer '+token;
        return config;
    }, function (error) {
        return Promise.reject(error);
    })
//响应拦截器,在请求之后,服务器返回数据就是一个响应过程
//响应拦截就是拦截数据从后台返回前端的过程
//在响应拦截离,我们可以优先对4xx,5xx开头的状态吗进行处理
//可以弹窗也可以跳转到指定的页面
axios.interceptors.response.use(function (response) {
    console.log(response);
    return response;
    }, function (error) {
        return Promise.reject(error);
    })

const qhAxios = {
    get:(url,params)=>{
        return axios.get(url,{params})
    },
    post:(url,params)=>{
        return  axios.post(url,params)
    }
}

Vue.prototype.$http = qhAxios;

export default  qhAxios;