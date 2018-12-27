<template>
    <el-dialog
    title="新增用户"
    :visible.sync="dialogVisible"
    width="45%"
    :before-close="handleClose">
    <el-form :model="userInfo" :rules="rules" ref="userInfo">
        <div class="UserInput">
            <div>
                <span>用户名:</span>
                <el-form-item prop="username">
                    <el-input type="text" v-model="userInfo.username"></el-input>
                </el-form-item>
            </div>
            <div>
                <span>用户名:</span>
                <el-form-item prop="password">
                    <el-input type="password" v-model="userInfo.password"></el-input>
                </el-form-item>
            </div>
        </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="uploadUser">确 定</el-button>
    </span>
    </el-dialog>
</template>

<script>
export default {
     data() {
         const checkUsername = (rule,value,callback)=>{
            var re = /^[a-zA-Z]\w{1,19}$/;
            var rs = re.test(value);
            if(!rs){
                return callback(new Error("用户名不能包含特殊字符"))
            }
            return callback();
         }
      return {
        dialogVisible: true,
        userInfo:{},
        rules:{
            username:[
                {required:true,message:"请输入用户用",trigger:"change"},
                {min:2,max:20,message:"用户名长度在2~20之间",trigger:"change"},
                {validator:checkUsername,trigger:"change"}
            ],
            password:[
                {required:true,message:"请输入密码",trigger:"blur"},
                {min:3,max:20,message:"密码长度在3~20之间",trigger:"blur"}
            ]
        }
      };
    },
    methods: {
      handleClose(done) {
       this.dialogVisible = false,
       this.$router.go(-1)
      },
      uploadUser(){
          this.$refs["userInfo"].validate((valide)=>{
              if (valide) {
               this.$http.post(this.$apis.addNewUser,this.userInfo).then((resp)=>{
                    this.$message({
                        message:  resp.data.message,
                        type: resp.data.success?'success':'danger'
                    });
                    this.handleClose();
                    this.$store.dispatch('loadAllUsers')
               })   
              }else{
                  return false;
              }
          })
      }
    }
}
</script>

<style lang="scss" scoped>
    .el-form {
        width: 100%;
        height: 150px;
         .UserInput {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            div {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                span {
                    line-height: 40px;
                    flex: 1;
                    width: 25%;
                }
               .el-form-item {
                  flex: 3;
                  width: 300px;
                  height: 40px;
                  margin: 0;
                  .el-input {
                      width: 300px;
                  }
               }
            }
        }
    }
       
</style>
