<template>
    <div id="login">
        <div id="loginCover">
            <div id="loginBox">
                <div class="loginTitle">
                    可米彩票
                </div>
                <!-- :model绑定要验证的对象 :rules验证规则 -->
                <el-form class="loginInput" :model="userInfo" :rules="rules" ref="userInfo">
                    <el-form-item prop="accountName">
                        <el-input v-model="userInfo.accountName" type="text" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="userInfo.password" type='password' placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                       <el-switch
                            v-model="rememberMe"
                            active-color="#13ce66"
                            inactive-color="#cccccc"
                            active-text="记住密码?"
                        >
                        </el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="login" style="width:80%;">
                            登陆
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            rememberMe:true,
            userInfo:{
                accountName:'zmt',
                password:'12345'
            },
            //指定登陆信息的长度以及其他信息
            rules:{
                accountName:[
                    {required:true,min:2,message: '请输入用户名', trigger: 'blur'}
                ],
                password:[
                    {required:true,min:5,message:'请输入密码',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        login(){
            //在登陆时对所有输入框进行校验,减少对服务器的请求,如果不符合rules,则不进行服务器请求
            this.$refs['userInfo'].validate((valid) => {
                if (valid) {
                    this.$http.post('/signin',this.userInfo)
                    .then((resp)=>{
                        /*  
                        *   console.log(resp.data.token);
                        *   由于在main.js中设置了全局路由守卫,对所有的跳转都会进行拦截,如果用户没有登录则跳转到登陆页面
                        *   如果登陆成功,则把token数据存储在本地,避免路由守卫查询不到登录状态而跳回登陆页面
                        *   token是用来检查用户登录状态信息的参数(mian.js详情)
                        *   如果data.success为true,表示登陆成功
                        */
                        if (resp.data.success == true) {
                            localStorage.setItem('token',resp.data.token);
                            //将用户的选择保存到本地,当用户下次打开的时候,默认上次的选择
                            localStorage.setItem('isRemember',this.rememberMe)
                            /*  
                            *   console.log(this.$route)
                            *   如果用户从其他页面跳转过来登陆页面,登陆成功后根据query携带的参数跳转回原先的页面,
                            *   否则直接到主页hom
                            */
                            if (this.$route.query.redirect) {
                                this.$router.push({path:this.$route.query.redirect})
                            }else{
                                this.$router.push({path:'/home'})
                            }
                        }
                    })
                } else {
                    return false;
                }
            });
        }
    },
    created() {
        //监听浏览器关闭动作,当前用户关闭浏览器或者标签页
        //如果rememberMe为true,则将数据保存到本地,否则清空
        this.rememberMe = localStorage.getItem('isRemember')==='true'?true:false;
        
        window.onbeforeunload = (ev)=> {
            var ev = ev || window.event;
            // ev.returnValue = "我在这些点东西"
            if (this.rememberMe === false) {
                localStorage.removeItem('token');
            }
        };
    },
}
</script>

<style lang="scss" scoped>
    #login {
        width: 100%;
        height: 100%;
        background: url('../../assets/loginBG.jpg') no-repeat;
        background-size: 100%;
    }
    #loginCover{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        #loginBox {
            width: 30%;
            height: 100%;
            background: rgba(0,0,0,.8);
            float: right;
            .loginTitle {
                width: 100%;
                height: 30%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: rgb(204, 119, 119);
                font-size: 40px;
            }
            .loginInput {
                width: 100%;
                height: 70%;
                display: flex;
                flex-direction: column;
                align-items: center;
                div {
                    width: 80%;
                    height: 10%;
                    font-size: 16px;
                    .el-input {
                    //样式穿透的写法,无法设置.el-input的样式
                    //也无法直接设置其子元素的样式时,在其子元素前面加 /deep/
                      /deep/ input { 
                            background: none;
                            width: 100%;
                            height:40px;
                            color: white;
                            border:none;
                            outline: none;
                            border-radius: 0;
                            border-bottom: 1px solid rgb(107, 106, 106);
                        }
                    }
                }
            }
        }
    }
</style>
