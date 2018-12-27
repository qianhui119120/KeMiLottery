import Vue from 'vue'
Vue.mixin({
    methods:{
        //如果用户的操作需要二次确认,可以直接调用该函数
        operatorConfirm(message,action){
            this.$confirm(`您确定要${message}吗?`,"提示",{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                action();
            }).catch(() => {    
            });
        },
        post(api,params){
            return this.$http.post(api,params).then((resp)=>{
                this.$message({
                    message:  resp.data.message,
                    type: resp.data.success?'success':'danger'
                });
            })
        },
        //重置表单验证警告
        resetForm(formName) {
            this.$refs[formName].resetFields();
          }
    }
})