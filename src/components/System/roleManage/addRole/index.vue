<template>
    <div id="addRole">
        <el-form :model="roleInfo" :rules="rules" ref="roleInfo">
            <div class="roleAdd">
                <div class="addRoleFormHeader">
                    <span>新增角色</span>
                    <i class="fa fa-times" @click="handleClose"></i>
                </div>
                <div class="rolename">
                    <span>角色名:</span>
                    <el-form-item prop="roleName">
                        <el-input type='text' v-model="roleInfo.roleName"></el-input>
                    </el-form-item>
                </div>
                <div class="roleDesc">
                    <span>角色描述:</span>
                    <el-form-item prop="roleDesc">
                        <el-input type="text" v-model="roleInfo.roleDesc"></el-input>
                    </el-form-item>
                </div>
                 <!-- 
                :data 是要展示的数据
                default-expand-all: 默认全部展开,如果不想全部展开,则可以删掉这句
                node-key: 给每个节点一个唯一标记
                :props: 设置显示数据的数据结构
                children: '需要展示的子数组'
                lable: '显示在复选框右侧的文字'
                -->
                <div class="addPermission">
                    <el-tree
                    :data="allPermissions"
                    show-checkbox
                    node-key="_id"
                    ref="tree"
                    highlight-current
                    :props="defaultProps">
                    </el-tree>
                </div>
                <div class="addNewRole">
                    <el-button type="danger" size="mini" @click="handleClose">取消</el-button>
                    <el-button type="primary" size="mini" @click="addNewRole">确定</el-button>
                </div>
            </div>
           
        </el-form>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
     data(){
        return{
            roleInfo:{},
            rules:{
                roleName:[
                    {required:true,message:"请输入角色名",trigger:"blur"}
                ],
                roleDesc:[
                    {required:true,message:"请输入角色描述",trigger:"blur"}
                ]
            },
             defaultProps: {
                children: 'children',
                label: 'permissionDesc'
            }
        }
    },
    computed: {
        ...mapGetters(["allPermissions"])
    },
    methods: {
        handleClose(){
            this.$parent.showAddNew = false;
            //点击关闭后再次打开表单,清空之前的输入
            this.roleInfo = {};
;            //重置表单验证警告
            this.resetForm('roleInfo');
            //清空树形控件的选择
            this.$refs.tree.setCheckedKeys([]);
        },
        addNewRole(){
            //获取所有被选中的权限,参考element-ul插件
            var checkedPermissions = this.$refs.tree.getCheckedNodes();
            var permissionsId = ''; 
            var length = checkedPermissions.length;
            for (let i = 0; i < length; i++) {
                const permission = checkedPermissions[i];
                //如果被选中的权限中有最高权限,则拼接最高权限和子权限
                if (permission.parentid != '0') {
                    permissionsId += permission['_id'] +","+permission.parentid+","
                }else{
                //如果没有最高权限,全是子权限,则把所有子权限拼接
                    permissionsId += permission['_id']+",";
                }
            }
            //将获取到的权限的最后一个逗号去掉
            var rsId = permissionsId.slice(0,permissionsId.length-1);
            //将重复的最高权限去重(ES6的扩展运算符及Set的使用,数组去重)
            var rs = [...new Set(rsId.split(','))];
            console.log(rs);
            //将选中的权限赋值给新增的角色
            this.roleInfo.permissions = rs;
            //验证该角色及权限,验证成功则提交到服务器
            this.$refs['roleInfo'].validate((valide)=>{
                if (valide) {
                    //将新角色及权限提交到后台,发起post请求
                    this.post(this.$apis.addNewRole,this.roleInfo).then(()=>{
                        //提交完成后更新当前角色列表,发起请求
                        this.$store.dispatch('loadAllRoles',{
                            api:this.$apis.findAllRoles,
                            pageSize:10,pageNo:1
                        })
                        //关闭新增页面
                        this.handleClose();
                    })
                }else{
                    return false;
                }
            })
        }
    },

}
</script>

<style lang="scss" scoped>
    #addRole {
        width: 100%;
        .roleAdd {
            display: flex;
            flex-direction: column;
            box-shadow: 0 0 5px 5px #ccc;
            .addRoleFormHeader {
                width: 100%;
                height: 40px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                padding: 0 20px;
                span {
                    flex: 1;
                }
                i {
                    cursor: pointer;
                }
            }
             .rolename,.roleDesc {
                   display: flex;
                   flex-direction: row;
                   align-items: center;
                   span {
                       flex: 1;
                   }
                   .el-form-item {
                       flex: 3;
                       margin: 0;
                       .el-input {
                           width: 100%;
                           padding: 5px 0;
                       }
                   }
               }
               .addNewRole {
                   display: flex;
                   flex-direction: row;
                   justify-content: flex-end;
                   padding: 5px 10px;
                   box-sizing: border-box;
               }
        }
    }
</style>
